var xml='<?xml version="1.0"?>';
xml +='<music>';
xml +='    <composition>';
xml +='        <title>O Mio Babbino Caro</title>';
xml +='        <composer>Puccini</composer>';
xml +='        <time>2:12</time>';
xml +='        <filename>caro.mp3</filename>';
xml +='        <filepath>songs/caro.mp3</filepath>';
xml +='    </composition>';
xml +='    <composition>';
xml +='        <title>The Man I Love</title>';
xml +='        <composer>Gershwin</composer>';
xml +='        <time>2:57</time>';
xml +='        <filename>gershwin.mp3</filename>';
xml +='        <filepath>songs/gershwin.mp3</filepath>';
xml +='    </composition>';
xml +='    <composition>';
xml +='        <title>Allegro</title>';
xml +='        <composer>Beethoven</composer>';
xml +='        <time>3:45</time>';
xml +='        <filename>piano.mp3</filename>';
xml +='        <filepath>songs/piano.mp3</filepath>';
xml +='    </composition>';
xml +='    <composition>';
xml +='        <title>Prelude in C</title>';
xml +='        <composer>Rachmaninov</composer>';
xml +='        <time>3:48</time>';
xml +='        <filename>prelude.mp3</filename>';
xml +='        <filepath>songs/prelude.mp3</filepath>';
xml +='    </composition>';
xml +='    <composition>';
xml +='        <title>Funeral March</title>';
xml +='       <composer>Chopin</composer>';
xml +='        <time>9:14</time>';
xml +='        <filename>funeral.mp3</filename>';
xml +='        <filepath>songs/funeral.mp3</filepath>';
xml +='    </composition>';
xml +='</music>';




  var player;
        var intv;
        var slider;

        //Init
        //
        ////////////////////////////
        window.onload = function()
        {
            
            document.getElementById('btnPlay').addEventListener('click', playMusic, false);
            document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
            document.getElementById('btnStop').addEventListener('click', stopMusic, false);
            document.getElementById('btnVolUp').addEventListener('click', volUp, false);
            document.getElementById('btnVolDown').addEventListener('click', volDown, false);
            document.getElementById('btnforward').addEventListener('click', forward, false);
            player = document.getElementById('player');
            slider = document.getElementById('sliderTime');
            slider.addEventListener('change', reposition, false);
            songSelect('songs/gershwin.mp3','The Man I Love')
            getMusicList();
        }
        
        function reposition()
        {
            player.currentTime = slider.value;
        }
        
         function forward()
        {
            var numseconds = (((player.currentTime % 31536000) % 86400) % 3600) % 60;           
            player.currentTime =  player.currentTime + Math.round(numseconds);
        }
        
        //Volume Controls
        //
        // 0.0  Silent - 1.0 Full Volume
        /////////////////////////////
        function volUp()
        {
            if(player.volume < 1)
            {
                player.volume += 0.1;
                console.log(player.volume);
            } else
            {
                player.volume = 1;
            }
        }
        
        function volDown()
        {
            if(player.volume > 0)
            {
                player.volume -= 0.1;
                console.log(player.volume);
            } else
            {
                player.volume = 0;
            }
        }
        //Music Play Controls
        //
        ///////////////////////////
        function playMusic()
        {
            player.play();
            intv = setInterval(update, 100);
            slider.max = player.duration;
        }
        
        function update()
        {
            document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
            slider.value = player.currentTime;
        }
        
        function millisToMins(seconds)
        {
            var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
            var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
            if (numseconds >= 10)
            {
                return "Time Elapsed: " + numminutes + ":" + Math.round(numseconds);
            } else
            {
                return "Time Elapsed: " + numminutes + ":0" + Math.round(numseconds);
            }
        }
        
        function pauseMusic()
        {
            player.pause();
            clearInterval(intv);
        }
        
        function stopMusic()
        {
            player.pause();
            player.currentTime = 0;
            clearInterval(intv);
        }        
$("#playAll").click(function(){
     var parser = new DOMParser();
            xmlDocument = parser.parseFromString(xml, "text/xml");
            var elementsArray = xmlDocument.documentElement.getElementsByTagName('composition');
           var arrayLength = elementsArray.length;
    for(var i=0; i < arrayLength; i++)
           {
                var filepath = elementsArray[i].getElementsByTagName('filepath')[0].firstChild.nodeValue;
                document.getElementById('player').src =  filepath;
               playMusic();
           }
});
        function getMusicList()
        {
            var parser = new DOMParser();
            xmlDocument = parser.parseFromString(xml, "text/xml");
            var elementsArray = xmlDocument.documentElement.getElementsByTagName('composition');
           var arrayLength = elementsArray.length;
           var output= "<table>";
           for(var i=0; i < arrayLength; i++)
           {
                var title = elementsArray[i].getElementsByTagName('title')[0].firstChild.nodeValue;
                var composer = elementsArray[i].getElementsByTagName('composer')[0].firstChild.nodeValue;
                var time = elementsArray[i].getElementsByTagName('time')[0].firstChild.nodeValue;
                var fileName = elementsArray[i].getElementsByTagName('filename')[0].firstChild.nodeValue;
               var filepath = elementsArray[i].getElementsByTagName('filepath')[0].firstChild.nodeValue;
                output += "<tr>";
                output += ("<td onclick='songSelect(\"" + filepath + "\",\""+title+"\")'>" + title + " By: " + composer + "</td>");
                output += "</tr>"; 
           }
           
           output += "</table>";
           document.getElementById('musicList').innerHTML = output;
        }
        
        function songSelect(fn,title)
        {
            //console.log(fn);
            document.getElementById('player').src =  fn;
            
            if(title !=undefined || title!='')
            {
            document.getElementById('currentSong').innerHTML=title;
            }
            else
            {
                document.getElementById('currentSong').innerHTML='Title Unknown';
                
            }
            playMusic();
        }
