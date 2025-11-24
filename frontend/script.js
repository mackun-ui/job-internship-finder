const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const loadingDiv = document.getElementById("loading");

const sortSelect = document.getElementById("sortSelect");
const filterSelect = document.getElementById("filterSelect");

let allJobs = []; // to store all fetched jobs
searchBtn.addEventListener("click", searchJobs);
sortSelect.addEventListener("change", updateDisplay);
filterSelect.addEventListener("change", updateDisplay);

async function searchJobs() {
    const query = document.getElementById("query").value.trim();
    const location = document.getElementById("location").value.trim();

    if (!query) {
        alert("Please enter a job title.");
        return;
    }

    loadingDiv.classList.remove("hidden");
    resultsDiv.innerHTML = "";

    try {
        const res = await fetch(
            `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&num_pages=1&country=${encodeURIComponent(location)}`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "4e23ef14admsha6b305f7b721d4fp11e3dbjsn7cd1d4d84af2",
                    "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
                }
            }
        );

        const data = await res.json();

        if (!data || !data.data || data.data.length === 0) {
            resultsDiv.innerHTML = "<p>No results found.</p>";
            loadingDiv.classList.add("hidden");
            return;
        }

        allJobs = data.data;
        updateDisplay();

    } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = "<p>Error loading results.</p>";
    }

    loadingDiv.classList.add("hidden");
}

function updateDisplay() {
    let jobs = [...allJobs];

    // for filtering
    const filter = filterSelect.value;

    if (filter === "fulltime") {
        jobs = jobs.filter(job => job.job_employment_type?.toLowerCase().includes("full"));
    }
    if (filter === "parttime") {
        jobs = jobs.filter(job => job.job_employment_type?.toLowerCase().includes("part"));
    }
    if (filter === "remote") {
        jobs = jobs.filter(job => job.job_is_remote === true);
    }

    // for sorting
    const sortType = sortSelect.value;

    if (sortType === "date") {
        jobs.sort((a, b) => new Date(b.job_posted_at_datetime_utc) - new Date(a.job_posted_at_datetime_utc));
    }
    if (sortType === "company") {
        jobs.sort((a, b) => (a.employer_name || "").localeCompare(b.employer_name || ""));
    }
    if (sortType === "title") {
        jobs.sort((a, b) => (a.job_title || "").localeCompare(b.job_title || ""));
    }

    renderJobs(jobs);
}

function renderJobs(jobs) {
    resultsDiv.innerHTML = "";

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.job_title}</h3>
            <p><strong>Company:</strong> ${job.employer_name || "N/A"}</p>
            <p><strong>Location:</strong> ${job.job_city || ""}, ${job.job_country || ""}</p>
            <p><strong>Type:</strong> ${job.job_employment_type || "Not specified"}</p>
            <p><a href="${job.job_apply_link}" target="_blank">Apply Here</a></p>
            <p><small>Posted: ${new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}</small></p>
        `;

        resultsDiv.appendChild(card);
    });
}
