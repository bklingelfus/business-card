# business-card
QR CODE BUSINESS CARD SITE
basic concept: site for sharing your business card without the need of a physical copy. Essentially you need two things: a personalized card page; and a way of sharing your card easily (QR Codes).

LINKS:
    working site: https://businesscard-qr-coder.netlify.app/
    database point: https://businesscard-backend.onrender.com/

BACKEND:
    All backend routes:
        GET route for testing: https://businesscard-backend.onrender.com/api
        GET route for all cards: https://businesscard-backend.onrender.com/card/all
        GET route for specific card: https://businesscard-backend.onrender.com/card/:id
        POST route for card creation: https://businesscard-backend.onrender.com/card/generate

    For the backend I used the following techs: 
        - Node.js
        - Express.js
        - MongoDB Atlas
    
    For this application there wasn't the need for that many routes, so the backend is quite simple and since the items had no relationship a non related DB was a good fit.
    In the future more functionalities could be added, which might require expanding the model and the routes needed, such as use profile login, editing cards, deleting cards, etc. In that case, it might be needed to switch to a PostgreSQL that offers the possibility of connecting multiple models for different tables.
    
FRONTEND:
    All frontend routes:
        home site: https://businesscard-qr-coder.netlify.app/
        generating QR Code site: https://businesscard-qr-coder.netlify.app/generate
        each card site: https://businesscard-qr-coder.netlify.app/businessCard/:id
    

    For the frontend I used the following techs: 
        - React.js
        - Tailwind.js
        - JS extensions (for routing, qrcode, downloading, etc.)
    
    I decided to create a home page just for navigation and so the user is not overwhelmed right from the start, but I have seeing other sites that you land directly on the QR code creation page. So that might be a future design change to make as I feel most sites try not to create too much walls for the user, since most users are only going to use the site very few times. So cutting down the "bureaucracy" of getting to a home page, logging in, etc. seems like a priority for these type of sites.


