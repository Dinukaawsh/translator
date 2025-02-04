# Translation App

This is a **Translation App** that allows users to translate text between different languages using APIs like **Deepl API** and **MyMemory API**. It provides a simple, user-friendly interface with language selection, text input, and translation results.

## Features

- **Text Translation**: Translates text from one language to another using **Deepl API** (high accuracy) or **MyMemory API** (lower accuracy).
- **Language Selection**: Choose source and target languages from a dropdown list.
- **RTL Language Support**: Detects right-to-left (RTL) languages (like Arabic, Hebrew) and adjusts text direction accordingly.
- **Responsive Design**: Works across different devices and screen sizes.
- View translated text.
- Error handling for invalid inputs or failed API requests.
- Clean and responsive UI built using React and Tailwind CSS.

## Technologies Used

- **Frontend**: React.js
- **Styling**: CSS
- **APIs**: 
  - **Deepl API** for high-accuracy translations
  - **MyMemory API** for lower-accuracy translations
- **Proxy Service**: **CORS Anywhere** (for Deepl API requests)

## Getting Started

To run this app locally, follow the steps below:

### Prerequisites

1. Install **Node.js** and **npm** (Node Package Manager) if you haven't already:  
   [Node.js Installation Guide](https://nodejs.org/en/download/)

2. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/translation-app.git


## Live Demo

You can access the live demo of the app here:  
[Live Demo](https://dinukaawsh.github.io/translator/)


________________________________________
## CORS Issues and Proxy Usage for Deepl API
- When using the Deepl API in the app, you may encounter CORS (Cross-Origin Resource Sharing) issues due to restrictions on making API requests directly from the frontend to the Deepl server. To overcome this, we use a CORS proxy.
- ## What is CORS?
CORS is a security feature in browsers that prevents cross-origin requests from untrusted sources. Since the Deepl API does not allow requests from unapproved domains, your app may face CORS errors when trying to access Deepl from the frontend.
## CORS Anywhere Limitations
To handle CORS issues, we use the CORS Anywhere proxy service. It offers temporary access for free, but there are some important limitations you should be aware of:
# Temporary Access: Access to the CORS Anywhere proxy is not permanent. You need to visit the CORS Anywhere demo page and request temporary access each time you first use it or if your session expires. You may also need to do this when using the application from a new device.
# Rate Limits: The free tier of CORS Anywhere is rate-limited and may not be suitable for production apps, especially with high traffic or frequent requests. This can lead to slower response times or temporary unavailability.
**Security Concerns:** Relying on a third-party proxy service like CORS Anywhere may expose your app to potential security risks, and the proxy service could experience downtime or limitations.
Better Alternatives
**Own Proxy Server:** A more reliable solution is to set up your own proxy server or backend to handle Deepl API requests. This eliminates the need to rely on third-party services and gives you full control over the requests.
**Deepl Paid API:** Deepl’s paid API offers a more stable, secure, and reliable way to access their translation services without encountering CORS issues.
Usage in This Application
## In this application, I am using the Deepl API (free version), which causes the CORS issue. However, by requesting temporary access through the CORS Anywhere demo page, you can use this application without encountering any issues.
Important Notes:
## Keep in mind that CORS Anywhere's free tier has limitations. If you experience any interruptions or issues, it's due to these restrictions.
## For a more stable experience, consider using Deepl's paid API or setting up your own proxy server.




