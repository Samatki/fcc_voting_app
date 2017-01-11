/* global $ */

//var testArray = [{plotName: 'Test1', creator:'creator1'},{plotName: 'Test2', creator:'creator2'},{plotName: 'Test3', creator:'creator3'},{plotName: 'Test4', creator:'creator4'},{plotName: 'Test5', creator:'creator5'}]

var currentPage = 1;

$(document).ready(function(){


        getCurrentPageData(currentPage);
        

});

function getCurrentPageData(page){
    $.ajax({
       url: 'API/getCurrentEntries?page=' + page,
       success: function(data){
          console.log(data)
        currentPage = data.requestedPage;
        console.log(currentPage);
        $('.container').html('');
        data.polls.forEach(function(index){
        $('.container').append('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="col-xs-10 col-xs-offset-1 pollListItem"><p>'+index.name+'</p><p>'+index.creator+'</p></div></div>')
            
        })
        if (data.noOfPages <= 1){
        }else if(data.requestedPage == 1){
            $('.container').append('<div class="col-xs-12" style="margin-top:50px;"><div id="pageForward" class="col-xs-4 col-xs-offset-4">Next Page</div></div>');            
        }else if(data.requestedPage == data.noOfPages){
            $('.container').append('<div class="col-xs-12" style="margin-top:50px;"><div id="pageBackward" class="col-xs-4 col-xs-offset-4">Previous Page</div></div>');            
        } else {
            $('.container').append('<div class="col-xs-12" style="margin-top:50px;"><div id="pageBackward" class="col-xs-3 col-xs-offset-2">Previous Page</div><div id="pageForward" class="col-xs-3 col-xs-offset-2">Next Page</div></div>');            
        }
        $('#pageBackward').on('click',function(){console.log('clicked ' + currentPage + ' : ' + --currentPage); getCurrentPageData(currentPage--)});
        $('#pageForward').on('click',function(){console.log('clicked ' + currentPage + ' : ' + ++currentPage); getCurrentPageData(currentPage++)});
        
       }
   })
}