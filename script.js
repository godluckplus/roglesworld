(function(){
    var burger=document.getElementById('burger');
    var navLinks=document.getElementById('navLinks');
    if(burger&&navLinks){
        burger.addEventListener('click',function(){
            burger.classList.toggle('on');
            navLinks.classList.toggle('open');
        });
        document.querySelectorAll('.menu a').forEach(function(l){
            l.addEventListener('click',function(){
                burger.classList.remove('on');
                navLinks.classList.remove('open');
            });
        });
    }

    var onlineEl=document.getElementById('onlineCount');
    if(onlineEl){
        function check(){
            fetch('https://api.mcsrvstat.us/3/166.1.144.104')
                .then(function(r){return r.json()})
                .then(function(d){
                    if(d&&d.online) onlineEl.textContent=d.players?d.players.online:'0';
                    else onlineEl.textContent='0';
                })
                .catch(function(){onlineEl.textContent='—'});
        }
        check();setInterval(check,60000);
    }

    document.querySelectorAll('.pa').forEach(function(a){
        var img=a.querySelector('.av');
        if(!img)return;
        var tw=a.getAttribute('data-twitch');
        var yt=a.getAttribute('data-youtube');
        var src='';
        if(tw)src='https://unavatar.io/twitch/'+tw+'?fallback=false';
        else if(yt)src='https://unavatar.io/youtube/'+yt+'?fallback=false';
        if(!src)return;
        img.src=src;
        img.onload=function(){if(img.naturalWidth>1)img.classList.add('on')};
        img.onerror=function(){img.classList.remove('on')};
    });

    var glow=document.createElement('div');
    glow.className='mouse-glow';
    document.body.appendChild(glow);

    var mx=0,my=0,gx=0,gy=0;
    document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});

    function animGlow(){
        gx+=(mx-gx)*0.08;
        gy+=(my-gy)*0.08;
        glow.style.left=gx+'px';
        glow.style.top=gy+'px';
        requestAnimationFrame(animGlow);
    }
    animGlow();

    var pCount=80;
    for(var i=0;i<pCount;i++){
        var p=document.createElement('div');
        p.className='particle';
        var size=Math.random()*4+2;
        p.style.width=size+'px';
        p.style.height=size+'px';
        p.style.left=Math.random()*100+'%';
        p.style.animationDuration=(Math.random()*12+8)+'s';
        p.style.animationDelay=(Math.random()*15)+'s';
        p.style.opacity='0';
        var hue=Math.random()>0.5?'212,136,58':'192,64,48';
        p.style.background='rgba('+hue+','+(Math.random()*0.4+0.5)+')';
        p.style.boxShadow='0 0 '+(size*3)+'px rgba('+hue+',0.4)';
        p.style.top=(100+Math.random()*20)+'%';
        document.body.appendChild(p);
    }

    setTimeout(function(){
        var tgbox=document.querySelector('.tgbox');
        if(tgbox&&!tgbox.querySelector('.tg-widget')){
            var empty=document.getElementById('tgEmpty');
            if(empty)empty.style.display='block';
        }
    },4000);
})();
