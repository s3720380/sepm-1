$(document).ready(function() {
    const studentsdata = [];
    const header = [];
    const workshops = {};
    const workshopteams = {};
    const minStudents = 5;
    const maxStudents = 7;
    let groups = [];
    let prunedgroups = [];
    const projectoptions = ["Web-app", "iOS app", "Android app", "desktop application"];
    const workshopnames = ["WRK01/01", "WRK01/02", "WRK01/03", "WRK01/04", "WRK01/05", "WRK01/06", "WRK01/07", "WRK01/08", "WRK01/09", "WRK01/10", "WRK01/11", "WRK01/12"];

    //below function uploads a file and presents it in a tabular format 
    uploadconfirm = document.getElementById('uploadconfirm').addEventListener('click', () => {
        document.getElementById("uploadconfirm").hidden = true
        console.log('Student preferences uploaded successfully');
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
                //console.log(studentsdata);
                addStudentsToWorkShops();
                createGroups();
                printWorkshopTeams();
            }
        })
    })


    //begin code here
    //the data extracted from the csv file is put into the 'studentdata' 2d array 
    function assignWorkshopName(someobject) {
        for (let workshopname of workshopnames) {
            someobject[workshopname] = [];
        }
    }

    function addStudentsToWorkShops() {
        assignWorkshopName(workshops);
        let workshopcolumn = 7;
        for (let student of studentsdata) {
            workshops[student[workshopcolumn]].push(student);
        }
        sortProjectPreferences();
        //console.log(workshops);
    }

    function sortProjectPreferences() {
        let optioncolumn = 9;
        let projectteams = {};
        assignWorkshopName(workshopteams);
        for (let option of projectoptions) {
            projectteams[option] = [];
        }
        for (let workshop in workshops) {
            for (let student of workshops[workshop]) {
                let projectoption = student[optioncolumn].replace(";", "");
                projectteams[projectoption].push(student);
                if (projectteams[projectoption].length === minStudents) {
                    workshopteams[workshop].push(projectteams[projectoption]);
                    projectteams[projectoption] = [];
                }
            }

        }
        //console.log(workshopteams);
    }

    function createGroups() {
        //console.log(JSON.stringify(workshopteams, null, 3))
        groups = $.map(workshopteams, function(value) {
            return [value]
        })
        console.log(groups);

        for (i = 0; i < groups.length; i++) {
            prunedgroups = prunedgroups.concat(groups[i]);
        }
        console.log(prunedgroups);
    }

    function printWorkshopTeams() {
        csvtable = `
                    <table class="table table-bordered text-white">
                        <tbody id="table">   
                        </tbody>
                    </table>         
                     `;
        document.querySelector("#table-container").innerHTML = csvtable;

        let j = 0;
        let row = "";
        let tablecontent = "";
        //     for (i = 0; i < groups.length; i++) {
        //         j = 0;
        //         while (j < groups[i].length) {
        //             row += `
        //                      <td>${groups[i][j]}</td>                                                   
        //                `;

        //             j++;
        //         }
        //         tablecontent += `</th>` + row + "</tr>";
        //         row = "";
        //     }
        //     document.getElementById('table').innerHTML = tablecontent;
        // }
        for (i = 0; i < prunedgroups.length; i++) {
            j = 0;
            while (j < prunedgroups[i].length) {
                row += `
                         <td>${prunedgroups[i][j]}</td>                                                   
                   `;

                j++;
            }
            let string = "Group: " + i
            tablecontent += `</th>` + string + row + "</tr>";
            row = "";
        }
        document.getElementById('table').innerHTML = tablecontent;
    }

});