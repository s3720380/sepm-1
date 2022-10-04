$(document).ready(function() {
    const studentsdata = [];
    const header = [];
    const workshops = {};
    //below function uploads a file and presents it in a tabular format 
    const uploadconfirm = document.getElementById('uploadconfirm').addEventListener('click', () => {
        Papa.parse(document.getElementById('uploadfile').files[0], {
            download: true,
            skipEmptyLines: true,

            complete: function(results) {
                for (i = 0; i < results.data.length; i++) {
                    if (i === 0) {
                        header.push(results.data[i])
                        continue
                    } else {
                        studentsdata.push(results.data[i])
                    }
                }
                //console.log(studentsdata)
                csvtable = `
                    <table class="table table-bordered text-white">
                        <thead class="thead-dark">
                            <tr id="header">
                            </tr>
                        </thead>
                        <tbody id="table">   
                        </tbody>
                    </table>         
                     `;
                document.querySelector("#table-container").innerHTML = csvtable;

                let headerrow = "";
                for (i = 0; i < header[0].length; i++) {
                    headerrow += `
                                            <th scope="col">${header[0][i]}</th>          
                                      `;
                }
                document.querySelector("#header").innerHTML = headerrow;

                let j = 0;
                let row = "";
                let tablecontent = "";
                for (i = 0; i < studentsdata.length; i++) {
                    j = 0;
                    while (j < studentsdata[i].length) {
                        row += `
                                     <td>${studentsdata[i][j]}</td>                                                   
                               `;

                        j++;
                    }
                    tablecontent += `</th>` + row + "</tr>";
                    row = "";
                }
                document.getElementById('table').innerHTML = tablecontent;
                addStudentsToWorkShops();
            }
        })
    })


    //begin code here
    //the data extracted from the csv file is put into the 'studentdata' 2d array 
    function makeWorkshops() {
        let workshopnames = ["WRK01/01", "WRK01/02", "WRK01/03", "WRK01/04", "WRK01/05", "WRK01/06", "WRK01/07", "WRK01/08", "WRK01/09", "WRK01/10", "WRK01/11", "WRK01/12"];

        for (let workshopname of workshopnames) {
            workshops[workshopname] = [];
        }
    }

    function addStudentsToWorkShops() {
        makeWorkshops();
        let workshopcolumn = 7;

        for (const student of studentsdata) {
            workshops[student[workshopcolumn]].push(student);
        }
        console.log(workshops);
    }

    function sortProjectPrefernces() {

    }

    function makeWorkshopTeams() {

    }

    function makeTeams() {
        // Initialise constants for Sprint 1, not customisable yet.
        const maxTeams = 5;
        var minStudents = 5;
        var maxStudents = 7;
        // Set all workshops into an array
        const wrkShops = ["WRK01/01", "WRK01/02", "WRK01/03", "WRK01/04", "WRK01/05", "WRK01/06", "WRK01/07", "WRK01/08", "WRK01/09", "WRK01/10", "WRK01/11", "WRK01/12", "Not enrolled in workshop class yet"];
        const teams = [];
        // Iterate through all workshop classes to sort students by workshop
        for (var i = 0; i < wrkShops.length; i++) {
            // Create empty array for students to be sorted into
            var students = [];
            // Iterate through 2D array of students from the csv
            for (var k = 0; k < studentsdata.length; k++) {
                // Add students with matching workshop class to the array
                if (studentsdata[k][7] == wrkShops[i]) {
                    students.push(studentsdata[k]);
                }
            }
            // Work on sorted students here
            for (var l = 0; l < 5; l++) {
                var currentTeam = [];
                if (students[l] == undefined) {
                    break;
                } else if (l == 0) {
                    for (var z = 0; z < 7; z++) {
                        students[z].unshift("1");
                        currentTeam.push(students[z]);
                    }
                    teams.push(currentTeam);
                } else if (l == 1) {
                    for (var z = 7; z < 14; z++) {
                        students[z].unshift("2");
                        currentTeam.push(students[z]);
                    }
                    teams.push(currentTeam);
                } else if (l == 2) {
                    for (var z = 14; z < 21; z++) {
                        students[z].unshift("3");
                        currentTeam.push(students[z]);
                    }
                    teams.push(currentTeam);
                } else if (l == 3) {
                    for (var z = 21; z < 28; z++) {
                        students[z].unshift("4");
                        currentTeam.push(students[z]);
                    }
                    teams.push(currentTeam);
                } else if (l == 4) {
                    for (var z = 28; z < 35; z++) {
                        students[z].unshift("5");
                        currentTeam.push(students[z]);
                    }
                    teams.push(currentTeam);
                }
            }
        }
        console.log(teams.toString());

    }

    function toCSV(inputArray, separator = ",") {
        let rowsAsString = inputArray.map(row => {
            return row.join(separator);
        })
        return csvFormat = rowsAsString.join("\n");
    }

});


//begin code here
//the data extracted from teh csv file is put into the 'studentdata' 2d array