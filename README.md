# Job Internship Finder

## Project Overview
Job Internship Finder is a web application designed to help students and early-career professionals discover internship opportunities across the United States. The app fetches live data from an external job-search API and presents it in a simple, easy-to-use interface. Users can search for internships by keyword, filter results, and sort listings to quickly find the opportunities that best fit their needs.  

This project was created to provide real value by helping users save time and find relevant internships without having to search multiple websites manually.  

---

## Features
- **Search:** Look for internships by job title, keyword, or company.  
- **Filter:** Narrow down listings based on job type, industry, or location within the USA.  
- **Sort:** Arrange results by relevance or posting date.  
- **User-Friendly Interface:** Clean and intuitive design for smooth interaction.  
- **Error Handling:** Graceful messages when the API is down or returns invalid data.  

---

## Limitations
- The application currently only supports internships in the **United States**, as the API used does not provide international listings.  
- Advanced filters like remote jobs, salary ranges, or international opportunities are not supported due to API limitations.  

---

## Installation & Running Locally
1. Clone the repository to your local machine:  
   ```bash
   git clone https://github.com/mackun-ui/job-internship-finder.git
2. Navigate into the project folder:
    ```bash
    cd job-internship-finder/frontend
3. Open index.html in a browser to use the application locally.

## Deployment
1. Upload the frontend files to the provided web servers (Web01 and Web02).
2. Configure the load balancer (Lb01) to distribute traffic between the two servers.
3. Test the application through the load balancer URL to ensure it works correctly and that API data loads as expected.
**Security Note:** Make sure API keys are stored securely and not exposed publicly.

## API Information
- API Name: JSearch API
- Documentation: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
- Purpose: Provides real-time internship listings in the USA.

## Demo Video
Watch the demo video here:
[Insert Demo Video Link]

The video demonstrates:
- Running the application locally
- Searching, filtering, and sorting internships
- How the application handles API responses and displays data

### Author: Manuelle Aseye Ackun