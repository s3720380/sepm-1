$(document).ready(function() {

    document.getElementById("uploadconfirm").addEventListener("click", function() {
        document.getElementById("download").hidden = false
    });

    function downloadCSVFile(csv, filename) {
        var csv_file, download_link;

        csv_file = new Blob([csv], { type: "text/csv" });

        download_link = document.createElement("a");

        download_link.download = filename;

        download_link.href = window.URL.createObjectURL(csv_file);

        download_link.style.display = "none";

        document.body.appendChild(download_link);

        download_link.click();
    }

    document.getElementById("download").addEventListener("click", function() {
        var html = document.getElementById("table-container");
        htmlToCSV(html, "teams.csv");
    });


    function htmlToCSV(html, filename) {
        var data = [];
        var rows = document.querySelectorAll("table tr");
        let k = 0;

        for (var i = 0; i < rows.length; i++) {
            k++;
            var row = [],
                cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++) {
                row.push("GROUP: " + k);
                row.push(cols[j].innerText);
            }

            data.push(row.join(","));
        }
        downloadCSVFile(data.join("\n"), filename);
    }

});