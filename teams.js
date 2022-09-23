const uploadconfirm = document.getElementById('uploadconfirm').addEventListener('click', () => {
    Papa.parse(document.getElementById('uploadfile').files[0],
        {
            download: true,
            complete: function (results) {
                str = JSON.stringify(results);
                document.getElementById('output').innerHTML = str;
                console.log(results);
            }
        })
})