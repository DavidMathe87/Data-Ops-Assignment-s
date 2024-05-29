To complete this task, I began by researching and selecting the optimal methods for extracting information from a web page. After a detailed analysis, I decided to use JavaScript (Node.js) along with the `axios` and `cheerio` packages. These tools enable HTTP requests to be made to websites and allow for the analysis of HTML structure to extract relevant information, such as image URLs, titles, and book prices.

Next, I implemented a scraping script using these packages. This script makes a request to the webpage URL, analyzes the HTML to extract the desired data, and saves the images to a local directory named `book_images`, as per the specifications.

The next step was to set up a web server using the `express` package to serve the saved images and display them on an HTML page. Information about the books was stored in a JSON file.

Finally, I tested the functionality of the entire project and prepared clear instructions for setup and execution.

Requirements for Running the Code:

To run the code successfully, you need to have Node.js and npm (Node.js package manager) installed on your computer. Additionally, an internet connection is required to make requests to the "Books to Scrape" website and to download the images.

The saved images are available in the `book_images` folder, which is automatically created by the scraping script. This folder is located in the same directory as the project source files.

Therefore, I have successfully completed this task, using a suitable set of technologies and adhering to specific requirements, to efficiently extract and display book images in a functional manner.