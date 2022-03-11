$(document).ready(function(){
    var item, title, author, description, artLink, artImg;
    var outputList = document.getElementById("list-output");
    var artUrl = "https://newsapi.org/v2/everything?q=Apple&from=2022-03-11&sortBy=popularity&apiKey=API_KEY";
    var apiKey = "27599ca3c88b4bbb8843eff7dbe80cea";
    var placeHldr = '<img src="https://via.placeholder.com/150">';
    var searchData;
    
    $("#search").click(function(){
        outputList.innerHTML ="";
        document.body.style.backgroundImage = "url('')";
        searchData = $("search-box").val();

        if(searchData === "" || searchData === null){
            displayError();
        }else{
            $.ajax({
                url: artUrl + searchData,
                dataType: "json",
                successs: function(response){
                    if(response.totalItems === 0){
                        alert("No result!... Try Again")
                    }else{
                        $("#title").animate({'margin-top': '5px'}, 1000);
                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function(){
                    alert("Something went wrong");
                }
            });
        }
        $("#search-box").val(searchData);

    });
    function displayResults(response){
        for(var i = 0; i < response.items.length; i+=2){
            item = response.items[i];
            title1 = item.title;
            author1 = item.author;
            description1 = item.description;
            artLink1 = item.url;
            artImg1 = (item.urlToImage) ? item.urlToImage.thumbnail : placeHldr;

            item2 = response.items[i+1];
            title2 = item2.title;
            author2 = item2.author;
            description2 = item2.description;
            artLink2 = item2.url;
            artImg2 = (item2.urlToImage) ? item2.urlToImage.thumbnail : placeHldr;
            
            outputList.innerHTML += '<div class="row mt-4">' +
                                        formatOutput(artImg1, title1, author1, description1, artLink1) +
                                        formatOutput(artImg1, title1, author1, description1, artLink1) +
                                        '</div>';
            console.log(outputList);                                        
        }
    }
    function formatOutput(artImg, title, author, description, artUrl ) {
      
        var viewUrl = 'articles.html?title='+title;
        var htmlCard = `<div class="col-lg-6">
          <div class="card" style="">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${artImg}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">Author: ${author}</p>
                  <p class="card-text">Publisher: ${description}</p>
                  <a target="_blank" href="${artUrl}" class="btn btn-secondary">Read Book</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
        return htmlCard;
      }
   
     
      function displayError() {
        alert("search term can not be empty!")
      }
   
})