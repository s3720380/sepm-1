$(document).ready(function () {
    const studentsdata = [];
    const header = [];

    //below function uploads a file and presents it in a tabular format 
    const uploadconfirm = document.getElementById('uploadconfirm').addEventListener('click', () => {
        Papa.parse(document.getElementById('uploadfile').files[0],
            {
                download: true,
                skipEmptyLines: true,

                complete: function (results) {
                    for (i = 0; i < results.data.length; i++) {
                        if (i === 0) {
                            header.push(results.data[i])
                            continue
                        } else {
                            studentsdata.push(results.data[i])
                        }
                    }
                    console.log(studentsdata)
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
                }
            })
    })

//begin code here
//the data extracted from teh csv file is put into the 'studentdata' 2d array 






});