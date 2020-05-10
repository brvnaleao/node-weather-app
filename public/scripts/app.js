    var htmlChanger = (function() {
        'use strict';

        var makeRequest = () => {
            
            document.querySelector('form').addEventListener('submit', (e)=>{
            e.preventDefault();
            var titleContent =  document.querySelector('#title-response');
            var content = document.querySelector('#response');

            titleContent.innerHTML = "Loading...";
            content.innerHTML = '';
            
            var city = document.querySelector('#search').value;
            fetchData(titleContent, content, city);
            })
        }

        var fetchData = (titleContent, content, city) =>{

            fetch(`http://localhost:3000/weather?address=${city}`)
                .then(response=>response.json())
                .then(data => {
                    if(data.error){
                        titleContent.innerHTML = `${data.title}`
                        content.innerHTML = `${data.error}`
                    return;
                }
            titleContent.innerHTML = `${data.title}`;
            content.innerHTML = `${data.msg}`;

        });

       }
        return {
         
            changeHTML: function() {
                makeRequest();
            }
          }  
      })();

      htmlChanger.changeHTML();


