// const restaurantsData = require('./fakedata10M.js');
const reviewsList = require('./sample_reviews.js');
const names = require('./names.js');
const cities = require('./cities.js');
const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const db = require('./db/mongodb.js');

const { exec } = require('child_process');


let generateData = () => {
    const t = process.hrtime();
    let data = [];

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
    };

    const getRandomDate = () => {
      const days = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
      };
      const checkDates = (num) => {
        return num < 10 ? '0' + num : num;
      };
      const month = Math.floor(Math.random() * 12) + 1;
      const day = checkDates(getRandomInt(1, days[month] + 1));
      const date = checkDates(month) + '/' + day + '/' + '2018';
      return date;
    };
    const getRandomName = () => {
      let names = [
        "Ori", "Tanek", "Conan", "Guy", "Yen", "Francesca", "Flynn", "Wylie", "Mona", "Lyle","Colby", "Cruz", "Xavier", "Sydney", "Whoopi", 
        "Mona", "Odessa", "Samson", "Finn", "Stewart", "Nehru", "Alana", "Rooney", "Dylan", "Scarlet", "Whitney", "Jin", "Brendan", "Beverly", "Tanya", 
        "Edan", "Nevada", "Henry", "Yvette", "Jolie", "Scott", "Brenden", "Regan", "Riley", "Raymond", "Carl", "Fletcher", "Kirk", "David", "Leo", 
        "Barbara", "Peter", "Rahim", "Lucy", "Neil", "Jerry", "Amery", "Eugenia", "Steven", "Carol", "Mallory", "Kameko", "Gage", "Hilary", "Inga", 
        "Dorothy", "Brent", "Jessamine", "Martena", "Robin", "Ezra", "Dora", "Ali", "Grant", "Phoebe", "Barclay", "Ima", "Lucius", "Aretha", "Blair", 
        "Tanner", "Sean", "Stewart", "Randall", "Chadwick", "Quintessa", "Hedda", "Minerva", "Vanna", "Connor", "Maris", "Athena", "Garrison", "Ariel", 
        "Phelan", "Griffith", "Gabriel", "Virginia", "Inga", "Maggie", "Gloria", "Hayes", "Alma", "Rylee", "Kermit", "Philip", "Darius", "Russell", 
        "Michelle", "August", "Jordan", "Robert", "Henry", "Amir", "Gretchen", "Skyler", "Ali", "Caleb", "Isaac", "Fay", "Jasmine", "Nicholas", 
        "Rahim", "Rogan", "Knox", "Caldwell", "Maggy", "Autumn", "Price", "Linus", "Cassady", "Libby", "Sharon", "Aiko", "Ross", "Amy", "Jenette", 
        "Alexandra", "Jerome", "Delilah", "Florence", "Abraham", "Lani", "Micah", "Aidan", "Rae", "Amelia", "Scott", "Felix", "Callum", "Nathan", 
        "Sawyer", "Nolan", "Felix", "Phillip", "Chiquita", "Larissa", "Jordan", "Derek", "Joan", "Harding", "Nathaniel", "Ivy", "Christian", "Gretchen", 
        "Larissa", "Cyrus", "Eleanor", "Rhiannon", "Dane", "Kelly", "Jelani", "Amity", "Shannon", "Hector", "Heather", "Bethany", "Octavia", 
        "Rahim", "Madeson", "Myra", "Macaulay", "Whoopi", "Brielle", "Gray", "Alyssa", "Naomi", "Courtney", "Kellie", "Deirdre", "Hamish", "Colton", 
        "Logan", "Teegan", "Keith", "Leonard", "Maile", "Ivan", "Clinton", "Aiko", "Lev", "Minerva", "Nora", "Arthur", "Fallon", "Winifred", 
        "Malachi", "Porter", "Rosalyn", "Martin", "Dara", "Alexander", "Hasad", "Bert", "Cole"
        ]
      let name = names[Math.floor(Math.random()*names.length)];
      return name;
    }

    const makeRandomCity = () =>{
      let cities = [
        "Singer", "Washington","Suitland", "Groton", "Yonah", "Grimsley","Tampico", "Roy","Loveland", "Alleghenyvi","Coinjock", "Cleary", "Edinburg",
        "Caledonia", "Farmington","Winston", "Wolcott", "Northchase","Nadine", "Cetronia", "Klondike", "Hillsboro", "Kerby", "Lacomb", "Juarez", 
        "Russellvill","Rockingham","Marshall","Gardiner","Sena","Day","Wildwood", "Genoa", "Austinburg","Cobbtown", "Trinway", "Crenshaw", 
        "Grahamtown", "Westwood", "Caroline", "Bawcomville", "Cumberland","Teasdale", "Rushford", "Oley", "Dennard", "Libertytown",
        "Harrodsburg","Kansas", "Crisman", "Itmann", "Homeland", "Hickory", "Thynedale", "Richford", "Cataract", "Ruckersvill",
        "Elfrida", "Woodruff", "Sims", "Enoree", "Grandview", "Baden", "Masthope", "Jacumba", "Grapeview", "Waverly", "Troy", "Dragoon", "Lewis", 
        "Ona","Mappsville","Duryea", "Roderfield","Cutter", "Sunbury", "Hannasville","Blanford", "Morningside","Reno", "Beaverdale","Madrid", 
        "Norwood", "Eagletown", "Topanga", "Biddle", "Caroleen", "Kipp", "Wyoming", "Tecolotito","Dargan", "Verdi", "Bentley", "Calvary", 
        "Fruitdale", "Rivereno", "Belgreen", "Grenelefe", "Rew","Cade", "Brazos", "Dixie", "Greenwich", "Frystown", "Brethren", "Southview", 
        "Corinne", "Utting", "Floris", "Bennett", "Crayne", "Condon", "Allensworth","Tooleville","Skyland", "Boonville", "Glenshaw", "Winesburg",
        "Caron", "Cassel", "Walton", "Otranto", "Aberdeen", "Leroy", "Gallina", "Eden", "Naomi", "Oberlin", "Orason", "Hebron", "Vandiver", 
        "Fairmount", "Tivoli", "Fivepointvi", "Valle", "Maplewood", "Belva", "Waikele", "Walker", "Hamilton", "Greenbackvi", "Chloride", 
        "Lowgap", "Independenc","Crown", "Leyner", "Wedgewood", "Cavalero", "Strong", "Darbydale", "Hoehne", "Jessie", "Coral", "Vowinckel", "Urie",
        "Harold", "Roosevelt", "Richville", "Blodgett", "Lund", "Cowiche", "Bath", "Omar", "Navarre", "Nogal", "Craig", "Curtice", "Garberville",
        "Turah", "Farmers", "Smock", "Lindisfarne", "Sisquoc", "Westmorelan", "Eggertsvill", "Graziervill","Woodlands", "Soudan", "Lorraine", 
        "Selma", "Greenock", "Brule", "Winchester", "Cecilia", "Sexton", "Kiskimere", "Bladensburg", "Echo", "Freeburn", "Whitmer", "Florence",
        "Bascom", "Bancroft", "Rote", "Henrietta", "Emory", "Belfair", "Crucible", "Marbury", "Avoca", "Albrightsvi","Germanton", "Dupuyer", 
        "Weogufka", "Lowell", "Wiscon", "Barclay", "Allison", "Summertown","Coventry", "Salvo", "Sugartown", "Sehili", "Enetai", "Hanover", 
        "Hiwasse", "Dale", "Oceola", "Outlook", "Weeksville","Reinerton", "Celeryville","Stockwell", "Needmore", "Bainbridge", "Kidder", "Gasquet",
        "Snelling", "Toftrees", "Wattsville","Hatteras", "Alamo", "Ribera", "Muir", "Takilma", "Wakulla", "Kent", "Boyd", "Catharine", "Orin", 
        "Fingerville","Ballico", "Dowling", "Finderne", "Como", "Lumberton", "Shelby", "Oasis", "Saranap", "Hilltop", "Croom", "Blende", "Terlingua",
        "Loretto", "Summerset", "Canoochee", "Ruffin", "Why","Harmon", "Hoagland", "Bowmansvill","Chilton", "Zortman", "Gerton", "Devon", 
        "Dellview", "Brogan", "Bluffview", "Kilbourne", "Limestone", "Abrams", "Chicopee", "Downsville","Ivanhoe", "Dexter", "Brownlee", "Abiquiu",
        "Edneyville","Bartonsvill","Virgie", "Nord", "Goldfield", "Cedarville","Ferney", "Lindcove", "Defiance", "Inkerman", "Levant", 
        "Rosburg", "Emison", "Maury", "Gambrills", "Rivera", "Bordelonvil","Ypsilanti", "Delwood", "Ezel", "Waterford", "Jackpot", 
        "Camino", "Sylvanite", "Nescatunga", "Matheny", "Guthrie", "Wacissa", "Movico", "Sultana", "Breinigsvil", "Nettie", 
        "Sanborn", "Bethany", "Coyote", "Rockhill", "Gilmore", "Colton", "Deltaville","Waterview", "Glenville", "Rutherford","Chamberino",
        "Fairview", "Vienna", "Coleville", "Dodge", "Ola","Idledale", "Kapowsin", "Santel", "Chical", "Finzel", "Orviston", "Caln", "Gerber", 
        "Tuskahoma", "Somerset", "Drummond", "Dorneyville","Comptche", "Campo", "Greer", "Talpa", "Vallonia", "Sparkill", "Leming", "Chemung", 
        "Barstow", "Sardis", "Biehle", "Choctaw", "Wakarusa", "Machias", "Driftwood", "Edmund", "Temperancev","Laurelton", "Axis", "Brady", 
        "Cashtown", "Westphalia","Kenmar", "Siglerville","Stouchsburg","Avalon", "Wilmington","Jardine", "Urbana", "Wikieup", "Glidden", "Buxton",
        "Caspar", "Coultervill","Lookingglas","Salix", "Wheaton", "Edenburg", "Frank", "Carlton", "Ventress", "Holcombe", "Gibsonia", 
        "Brantleyvil","Chaparrito","Tedrow", "Callaghan", "Wyano", "Watchtower","Chapin", "Columbus", "Loyalhanna","Lavalette", "Neahkahnie",
        "Dubois", "Barrelville","Herbster", "Shawmut", "Orick", "Leola", "Nanafalia", "Swartzville","Kennedyvill","Kirk", "Retsof", "Boykin", "Felt",
        "Stagecoach","Unionville", "San Francisco", "Okland", "Discovery bay", "Antioch", "Brentwood"
      ];

      let city = cities[Math.floor(Math.random()*cities.length)];
      return city;
    }
    const writeStream = fs.createWriteStream('generateDataFile.json');

    function make10MillData() {
      let i = 1e7;

      writeData();
      function writeData(){
        let storage = true;
        while(i > 0 && storage) {
          i--;
      
          const makeData = {
            restaurantId: i,
            restaurantName: faker.company.companyName(),
            restaurantReviews: [
              {
                username: getRandomName()+' '+faker.name.lastName(),
                city: makeRandomCity(),
                dinedDate: getRandomDate(),
                rating: getRandomInt(2,6),
                review: faker.lorem.sentence(),
              }
            ]
          }
          if(i % 100000 === 0){
            console.log(i, process.hrtime(t))
          }
          storage = writeStream.write(`${JSON.stringify(makeData)}\n`);
        }
        if(i > 0){
          writeStream.once('drain',writeData);
        }
        if(i === 0) {
          const script = 'mongoimport --db Restaurants_Reviews --collection restaurants --file generateDataFile.json --numInsertionWorkers 17'
          exec(script);
        }
      }
    }
    make10MillData();
}

generateData();