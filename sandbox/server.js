
const express = require("express")
const cheerio = require("cheerio");
const request = require("request");
const cors = require("cors")

var app = express();
app.use(cors());

var PORT = 3000;

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// app.get("/", function (req, res) {
//     console.log(req);
//     app.get({ uri: "https://en.wikipedia.org/wiki/Zero-day_(computing)" }, function (err, res, body) {
//         console.log(body);
//         console.log(res)
//         const $ = cheerio.load(body);
//         console.log($('body'))
//     })
// })

// let input = $("#searchInput").val().trim()
let input = "advil";
let searchURL = "https://www.goodrx.com/" + input + "/what-is?drug-name=" + input;

// https://www.goodrx.com/advil/what-is?drug-name=advil

request(searchURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {

        //loads scrapped html
        let $ = cheerio.load(html)
        // let info = $("body").text()
        let infoRelatedPills = $("#content > section > section > section > section > section.s8ji26z-0.kErmZY > section > div._180S5IyBsaerENxigrcm3J > div._2rANW1lgQ9bqbo49JhQeTK > div > div > div:nth-child(2) > p:nth-child(1) > span").text().split(", ");
        let infoBlackBox = $("#content > section > section > section > section > section.s8ji26z-0.kErmZY > section > div._180S5IyBsaerENxigrcm3J > div._2rANW1lgQ9bqbo49JhQeTK > div > div > div:nth-child(5)").text();
        let overviewContent = $("#content > section > section > section > section > section.s8ji26z-0.kErmZY > section > div._180S5IyBsaerENxigrcm3J > div._2rANW1lgQ9bqbo49JhQeTK > div > div > div:nth-child(8) > div").text();
        let dosingContent = $("#content > section > section > section > section > section.s8ji26z-0.kErmZY > section > div._180S5IyBsaerENxigrcm3J > div._2rANW1lgQ9bqbo49JhQeTK > div > div > div:nth-child(12)").html().split("<ul>");
        let doNotUseWith = $("#content > section > section > section > section > section.s8ji26z-0.kErmZY > section > div._180S5IyBsaerENxigrcm3J > div._2rANW1lgQ9bqbo49JhQeTK > div > div > div:nth-child(28) > div > ul:nth-child(3)").text();
        let precautionMedicalConditionsHeader = "The presence of other medical problems may affect the use of this medicine. Make sure you tell your doctor if you have any other medical problems, especially:"
        let pmc = $("#content > section > section > section > section > section.s8ji26z-0.kErmZY > section > div._180S5IyBsaerENxigrcm3J > div._2rANW1lgQ9bqbo49JhQeTK > div > div > div:nth-child(32) > div").text().split(":")
        let dosingInfoParsed = parseDosingContent();
        function parseDosingContent(){
            let finalReAssemblyArray = [];
            dosingContent.splice(0,1);
            let intermediateString = dosingContent.join("<ul>")
            let anotherArray = intermediateString.split("&#x2014;")
            finalReAssemblyArray.push("<ul>");
            finalReAssemblyArray.push(anotherArray.join("--"));
            let returnProduct = finalReAssemblyArray.join("")
            return(returnProduct);
        }
        let precautionMedicalConditions = handleConditionsData();
        function handleConditionsData() {
            let builderArray = [];
            let pmc2 = pmc[1].split(" or")
            for (let i = 0; i < pmc2.length; i++) {
                let checkSpaceArr = pmc2[i].split("")
                if (checkSpaceArr[0] === " ") {
                    let lastVal = builderArray[builderArray.length-1]
                    let combinedValue = lastVal + " or" + pmc2[i]
                    builderArray.splice(builderArray.length - 1, 1, combinedValue)
                    checkSpaceArr = [];
                } else {
                    builderArray.push(pmc2[i])
                    checkSpaceArr = [];
                }
            };
            let lastArray = (builderArray[builderArray.length - 1].split(" ."));
            lastArray.splice(lastArray.length - 1, 1)
            builderArray.splice(builderArray.length - 1, 1)
            lastArray.forEach(function (str) {
                builderArray.push(str);
            })
            return builderArray;
        }
        // let precautionsContent = "DO NOT USE WITH: " + doNotUseWith + precautionMedicalConditions

        console.log(infoBlackBox)
        console.log(infoRelatedPills)
        console.log(overviewContent)
        console.log("Definitely do not use with: " + doNotUseWith)
        console.log(precautionMedicalConditionsHeader)
        console.log(precautionMedicalConditions)
        console.log(dosingInfoParsed)

        app.get("/", function(req, res){
            let dataObj = {
                infoRelatedPills: infoRelatedPills
            }
            res.send(dataObj)
        })

        //creates a string with all of the text in the scrapped page
        // let info = $("#before_using_other_medical_problems").parent().text();
        //splits off the related drugs
        // let dataArray = info.split("(s)")
        //splits the second half of the related drugs 
        // let relDrugs = dataArray[1].split("ClassificationsAnalgesicPharmacologic");
        //splits the related drugs string into an array of drug names
        // let relatedDrugsArray = relDrugs[0].split(", ")
        // console.log(relatedDrugsArray)
        // console.log(dataArray[1].split("TOPOral"))





}

});


