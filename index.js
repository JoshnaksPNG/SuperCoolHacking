//Module Constants
const Math = require("math.js");
const readline = require('readline');
const fs = require('fs');

//For reading text input
readline.emitKeypressEvents(process.stdin);

//Program Run Length (seconds) and Result
//runLength is not used
const runLength = Math.round(Math.random() * 30) + 6;
const result = Math.floor(Math.random() * 3);

//Reading Program Constants from JSON
const colorList = JSON.parse(fs.readFileSync("colorList.json")).colorList;
const algJargon = JSON.parse(fs.readFileSync("algJargon.json")).jargonList;

//Text Classes
class TextBlock
{
  constructor(baseColor, colors, blockLength)
  {
    if(baseColor)
    {
      this.color = baseColor;
    } else
    {
      this.color = "\x1b" + colorList[ Math.round( Math.random() * (colorList.length - 1) ) ];
    }
    
    if(colors)
    {
      //Fill the Color list if it's length is less than 4
      //Manually Change 4 Here if you add more to the print() method
      if(colors.length < 4)
      {
        while(colors.length < 4)
        {
          colors.push(this.color);
        }
      } else
      {
        this.colors = colors;
      }

    } else
    {
      this.colors = [this.color, this.color, this.color, this.color];
    }

    //It's been 2 weeks since I started, and I mostly worked on it during the weekend, so I genuinly don't know what this variable
    //was for but I am too afraid to delete it.
    if(blockLength)
    {
      this.blockLength = blockLength;
    } else
    {
      this.blockLength = Math.round(Math.random() * 20) + 15;
    }
    
  }

  //Play around with this method to suit your needs
  print()
  {
    console.log(this.color);

    const Jeef = new PatternPrint(7, this.colors[0], 1);
    Jeef.print();

    const Jeefl = new PatternPrint(7, this.colors[1], 2);
    Jeefl.print();

    const Jeeflb = new PatternPrint(7, this.colors[2], 3);
    Jeeflb.print();

    const Jeeflbs = new PatternPrint(7, this.colors[3], 0);
    Jeeflbs.print();

    console.log("\x1b[0m");
  }
}

class PatternPrint
{
  constructor(lines, color, type)
  {
    this.lines = lines;
    this.color = color;

    if (type || type === 0)
    {
      this.type = type;
    } else
    {
      this.type = Math.round(Math.random() * 3);
    }
  }

  print()
  {
    switch (this.type)
    {
      //"Finding Encryption Key"
      case 0:
        {
          console.log("\x1b[47m%s\x1b[0m" + this.color, "Finding Encryption Key");

          //Print random strings in the console of lengths between 60 and 80
          for(let i = 0; i < this.lines; ++i)
          {
            const length = 70 + ( Math.round( Math.random()* 20 ) - 10 );
            const keyLine = new RandomString(length);
            console.log(keyLine.string);
          }

          console.log("\n");
        }
        break;

      //Algorithm Jargon (https://en.wikipedia.org/wiki/List_of_terms_relating_to_algorithms_and_data_structures)
      case 1:
        {
          console.log("\x1b[47m%s\x1b[0m" + this.color, "Deriving Algorithm");

          //Print random jargon accompanied by random strings at intervals of 100 to 500

          //Set time and iteration variables
          let iteration = 0;
          let initTime = Date.now();
          let timeBuffer = 300 + ( Math.round( Math.random() * 400 ) - 200 );

          //Print jargon every interval
          while (iteration < this.lines)
          {
            if (Date.now() >= initTime + timeBuffer)
            {

              let rep = Math.round(Math.random()*4);

              console.log(algJargon[ (Math.round( Math.random() * (algJargon.length - 1) ) ) ]);

              
              for (let i = 0; i < rep; ++i)
              {
                const length = 70 + ( Math.round( Math.random()* 20 ) - 10 );
                const algLine = new RandomString(length);

                console.log(algLine.string);
              }
              
              console.log("\n");

              initTime = Date.now();
              timeBuffer = 300 + ( Math.round( Math.random() * 300 ) - 150 );

              ++iteration;
            }
          }

          console.log("\x1b[32m\x1b[47m%s\x1b[0m" + this.color + "\n", "Algorithm found");
        }
        break;

      //"Rerouting Network"
      case 2:
        {
          let ports = Math.round(Math.random()*5);
            
          //
          for(let i = 0; i < ports; ++i)
          {
            console.log(this.color + "Accessing Port %s", i);

            let initTime = Date.now();
            let timeBuffer = 3000 + ( Math.round( Math.random() * 4000 ) - 2000 );
            
            let fourths = 1;

            while(Date.now() < initTime + timeBuffer)
            {
              if(Date.now() - initTime >= (fourths * timeBuffer / 4))
              {
                console.log("%s\% Access", 25 * fourths);
                ++fourths;
              }
            }

            console.log("Port %s Access Secured \n", i);
          }
        }
        break;
      
      //"Establishing Serial Link"
      case 3:
        {
          console.log(this.color + "Establishing Serial Link With Ports");

          let initTime = Date.now();
          let timeBuffer = 3000 + ( Math.round( Math.random() * 4000 ) - 2000 );

          while(Date.now() < initTime + timeBuffer)
          {}

          console.log("Serial Link Established Through Port 0\n");
        }
        break
    }
  }
}

class RandomString
{
  constructor(length)
  {
    this.length = length;

    //Set string property to string of psuedo-random character
    let output = "";

    for(let i = 0; i < this.length; ++i)
    {
      let charCode = Math.round(Math.random() * 93) + 33;

      output = output + String.fromCharCode(charCode);
    }

    this.string = output;
  }
}

//"Hacking" Text
const Jobbles = new TextBlock("\x1b" + colorList[0], ["\x1b" + colorList[2], "\x1b" + colorList[1], "\x1b" + colorList[2], "\x1b" + colorList[0]]);
Jobbles.print();

//Result of "Hacking"
if(result)
{
  console.log("\x1b[32mAccess Secured");
} else
{
  console.log("\x1b[31mAccess Failure");
}
