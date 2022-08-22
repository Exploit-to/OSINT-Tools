let http = require('http');
let crypto = require('crypto');
let fs = require('fs');
let path = require('path');
const exec = require('child_process').exec;

const repo = "$PWD/cve/cve";

exec('cd ' + repo + ' && git pull');

const directoryPath = path.join(__dirname, "cve/cve");
let yearList = [];

var files = fs.readdirSync(directoryPath);
files.forEach(file => {
    if (!isNaN(file)) {
        yearList.push(parseInt(file))
    }
});

console.log(yearList.reverse())

function cleanText(description) {
    description_lines = description.split('\n')

    description_lines = description_lines.map((line) => {
        line.replace(/^- +/gm, '- ')
    })

    description_lines = description_lines.map((line) => {
        line.replace(/(https?:\/\/[^\s]+)/gm, '<a target="_blank" href="'+line+'">'+line+'</a>')
    })


}

/*

    #add <br/> for each line
    description = '<br/>'.join(description_lines)
    return description



#generate JSON for each CVE
for year in years:
    
    yearDir = os.path.join(dir, year)
    for CVE_filename in os.listdir(yearDir):

        #open CVE file
        CVE_file = open(os.path.join(yearDir, CVE_filename), 'r')
        #read CVE file
        CVE_file_content = CVE_file.read()

        #extract CVE description, references and github
        CVE_description = CVE_file_content.split('### Description')[1].split('###')[0].strip()
        CVE_references = CVE_file_content.split('### Reference')[1].split('###')[0].strip()
        CVE_github = CVE_file_content.split('### Github')[1].split('###')[0].strip()
        
        #TODO: extract imageshield label attributes
        
        CVE_Name = CVE_filename.split('.')[0]
        
        CVE_description = clean_text(CVE_description)
        CVE_github = clean_text(CVE_github)
        CVE_references = clean_text(CVE_references)

        thisCVE = [year,CVE_Name, CVE_description, CVE_github,CVE_references]
        CVE_list.append(thisCVE)

CVE_output = f"dataTable_data = {json.dumps(CVE_list)}"

#save CVE list to JSON file
with open('CVE_list.json', 'w') as outfile:
    outfile.write(CVE_output)
*/


/*
<!DOCTYPE html>
<html>

<head>
    <meta content="initial-scale=1, maximum-scale=1, 
                user-scalable=0" name="viewport" />
    <meta name="viewport" content="width=device-width" />

    <!-- Stylesheets for bootstrap + datatables 5 -->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://cdn.datatables.net/1.11.4/css/dataTables.bootstrap5.min.css'>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/js/dataTables.bootstrap5.min.js">

    <!-- JS for jquery + datatables + datatables>bootstrap-->
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js">
    </script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js">
    </script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.11.4/js/dataTables.bootstrap5.min.js">
    </script>

    
    </script>

    <style>
        body {
            margin-top: 5%;
            font-size:12px;
            margin-left:5%;
            margin-right:5%;
        }

        #overlay {
            background: #ffffff;
            color: #666666;
            position: fixed;
            height: 100%;
            width: 100%;
            z-index: 5000;
            top: 0;
            left: 0;
            float: left;
            text-align: center;
            padding-top: 25%;
            opacity: .80;
        }

        button {
            margin: 40px;
            padding: 5px 20px;
            cursor: pointer;
        }

        .spinner {
            margin: 0 auto;
            height: 64px;
            width: 64px;
            animation: rotate 0.8s infinite linear;
            border: 5px solid firebrick;
            border-right-color: transparent;
            border-radius: 50%;
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>

    <!-- Bootstrap overlay div with growing spinner -->
    <div id="overlay">
        <div class="spinner"></div>
        <br />
        Loading... (usually 5-10s)
    </div>


    <div class="row justify-content-center" width="800px">
        <div class="">
            <h2>CVE Search</h2>
            <!--HTML table with student data-->
            <table id="datatable" class="table table-striped table-bordered" style="display:none" cellspacing="0"
                width="100%">
                <thead>
                    <tr>
                        <th>CVE_Year</th>
                        <th>CVE_Name</th>
                        <th>CVE_description</th>
                        <th>CVE_github</th>
                        <th>CVE_references</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>CVE_Year</th>
                        <th>CVE_Name</th>
                        <th>CVE_description</th>
                        <th>CVE_github</th>
                        <th>CVE_references</th>
                    </tr>
                </tfoot>

            </table>
        </div>
    </div>

    <footer class="mt-auto text-black-50">
        <p>Searchable CVEs from <a href="https://github.com/trickest/cve" class="text">https://github.com/trickest/cve</a>, by <a href="https://twitter.com/andrewmohawk" class="text">@AndrewMohawk</a>.</p>
    </footer>

    <script type="text/javascript" src="CVE_list.json"></script>


    <script>
       
        // Initialization of datatable
        $(document).ready(function () {
            var startTime = new Date().getTime();
            table_settings = {
                "dom": 'flirtp<"dt-buttons"Bf>',
                "paging": true,
                "processing": true,
                responsive: false,
                "deferRender": true,
                oLanguage: { sProcessing: "<div id='loader'></div>" },
                "buttons": [
                    'colvis',
                ],
                "bSortClasses": false,
                "bAutoWidth": false,
                "aoColumns": [
                    { "sWidth": "5%" },
                    { "sWidth": "10%" },
                    { "sWidth": "55%" },
                    { "sWidth": "20%" },
                    { "sWidth": "10%" },
                ],
                "order": [[ 1, "desc" ]],
                "orderClasses": false,
                "data": dataTable_data,
                initComplete: function () {
                    // Apply the search
                    this.api().columns().every(function () {
                        var that = this;

                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that
                                    .search(this.value)
                                    .draw();
                            }
                        });
                    });


                }
            }

            $('#datatable tfoot th').each(function () {
                var title = $(this).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });

            $('#overlay').show()
            $('#datatable').on('init.dt', function () {
                var endTime   = new Date().getTime();
                var totalTimeTaken = (endTime - startTime) / 1000;
                console.log('Table initialisation complete in: ' + totalTimeTaken + "s");
                $('#datatable').show();
                $('#overlay').hide()
            })
                .on('init', function () {
                    $('*[type="search"][class="form-control input-sm"]')
                        .addClass('input-lg')
                        .css({ 'width': '400px', 'display': 'inline-block' });
                    $('div.dataTables_filter').css({ 'margin-top': '1em' });
                })
                .dataTable(table_settings);

        });
    </script>
</body>

</html>
*/