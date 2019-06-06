const puppeteer = require("puppeteer");
const { COURSERA_ENDPOINT } = require("../config/Constants.js")

// main parse function
async function parse(verificationKey) {
  const browser = await puppeteer.launch({args: ["--no-sandbox"]});
  const page = await browser.newPage();
  let responseBody;
  try {
    // make request to coursera
    const url = `${COURSERA_ENDPOINT}/${verificationKey}`;
    await page.goto(url);
    // extract course certificate information from page
    const certificateParams = await page.evaluate(_certificateInformationExtraction);
    responseBody = { status: "valid", ...certificateParams };
  } catch(err) {
    responseBody = { status: "error" }
  } finally {
    await browser.close();
    return responseBody;
  }
}

// extract name, date, uni, etc from web page
function _certificateInformationExtraction() {
  const courseName = document.querySelector("h4").innerText;
  const paragraphs = document.querySelectorAll("p");
  const studentNameAndDate = paragraphs[0].innerText;
  const schoolName = paragraphs[3].innerText;
  const studentName = studentNameAndDate.match(/Completed by.*? at /)[0].slice(13, -4);
  const completionDateString = studentNameAndDate.match(/ at .*? GMT/)[0].slice(4);
  const completionDate = new Date(completionDateString.replace(/,/g, "").split(" ").slice(1, 4).join(" ")).getTime();
  return { courseName, schoolName, studentName, completionDate };
}

exports.parse = parse;

// if running file directly
if (require.main === module) {
  (async function(){
    // grab key from command line args
    const [ _, __, verificationKey, ...others ] = process.argv;
    if(!verificationKey) {
      console.log("verification key required");
      process.exit();
    }
    // print result
    console.log(await parse(verificationKey));
  })()
}
