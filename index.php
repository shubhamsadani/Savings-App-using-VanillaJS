<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Savings App</title>
    <link rel="icon" href="rupee icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <script src='https://kit.fontawesome.com/a076d05399.js'></script>
    <style>
        @media screen and (max-width: 500px){
            .navbar-brand,h2,h5{
                font-size: 1rem;
            }
            small{
                font-size: 0.75rem;
            }
            .modify{
                font-size: 0.65rem;
            }
            .navbar-brand,h2,h5{
                font-size: 1rem;
            }
            .modify{
                font-size: 0.65rem;
            }
            input::placeholder{
                font-size: 0.75rem;
            }
            button,.rupay{
                font-size: 0.85rem !important;
            }
        }
        @media screen and (max-width: 374px){
            .px-5{
                padding-right: .5rem !important;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-dark bg-dark" style="justify-content: unset;">
        <button class="navbar-toggler d-block collapsed" style="border: none;padding-left: 0%;padding-right: 0%;margin-left: 0%;margin-right: 10px;" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" style="width: 5vw;"></span>
        </button>
        <span class="navbar-brand" href="index.php" style="color: azure;">Savings App</span>
        <span class="navbar-brand ml-auto mr-0" style="color: azure;" style="float: right;" id="total"></span>
        
        <div class="collapse navbar-collapse bg-dark" id="navbarToggler">
            <ul class="nav navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="index.php">Home<span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="year.html">History</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="mover.html">Import / Export</a>
              </li>
            </ul>
        </div>
    </nav><br>

    <div class="container">
        <div class="jumbotron bg-grey" >
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-primary text-white rupay">Rs</span>
                </div>
                <input type="text" class="form-control" placeholder="Amount" aria-label="Amount" id="amount">
            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Description" aria-label="Description" id="inputdesc">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary bg-danger text-white" id="debit">Debit</button>
                    <button class="btn btn-outline-secondary bg-success text-white" id="credit">Credit</button>
                </div>
            </div>
            
        </div>
        <!-- <div class="card">
        <div class="card-body">
            <h5 class="card-title text-primary">Apple</h5>
            <p class="card-text text-success">25/11/20, Wednesday</p>
        </div>
        </div> -->
        <ul class="list-group mb-3" id="output"></ul>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script src="main.js"></script>

</body>
</html>
