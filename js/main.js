window.addEventListener('load',function(){

    let h; //윈도우의 높이
    let n = 0; //메뉴의 인덱스
    let pageList = []; //페이지를 배열로 선언.
    let moving = false; //다시 클릭시 위에 조건문에 의해 실행되지 않도록 함

    const container=this.document.getElementsByClassName("container")[0];
    let menu; //메뉴
    let menuList; // 버튼들의 집합

    for(let i = 0; i < container.children.length; i++){
        if(container.children[i].tagName ==='DIV'){
            pageList.push(container.children[i]);
        }else{
            menu = container.children[i]
            menuList = menu.children
        }
    }
// console.log(menuList);

function init(){//화면의 높이 설정, 첫화면에서 애니메이션 동작
    h =window.innerHeight; //창 높이 설정
    for(let i = 0;i < pageList.length; i++){
        pageList[i].style.height= h + 'px'
        if(i != 0){
            pageList[i].style.top = h + 'px'
        }else{
            pageList[i].style.top = 0 + 'px'
            setTimeout(layoutInit,400) //메인타이틀 애니메이션 호출
        }
    }
}

 init(); //처음에 시작하는 함수 호출
window.addEventListener('resize',init);  //화면 크기에 따른 높이 변화


function layoutInit(){
    moving = false;
    for(let i = 0; i < pageList.length; i++){
        if(i == n){
        pageList[i].classList.add('active');
        menuList[i].classList.add('on')
        }else{
        pageList[i].classList.remove('active');
        menuList[i].classList.add('on')
        }
    }

}


//스크롤 메뉴


for(i=0; i<menuList.length; i++){
    menuList[i].index = i;

    menuList[i].addEventListener('click',(e)=>{
        e.preventDefault();
        if(moving) return;
        moving = true;

        if(n == e.currentTarget.index) return;
        n = e.currentTarget.index; //현재 클릭한 버튼의 인덱스
        h = window.innerHeight; //해당되는 sub외에 sub들을 화면 화면높이의 아래쪽으로 이동

        for(let j = 0; j < pageList.length; j++){ //0 1 2 3 4 5
            if(j <= n){// n = 2 => pageList[2]
                pageList[j].style.top=0+"px"; // sub 움직임은 스타일 이용 움직임
            if(j == n){
                    setTimeout(layoutInit,400)
                }
            }else{
                pageList[j].style.top=h+"px";
            }
        }
    })
}


//마우스 휠 이벤트
let total=pageList.length-1; // 전체 리스트 개수 변수
document.addEventListener('mousewheel',(e)=>{
    if(moving) return;
    moving = true;

    // console.log(e)
    // console.log(e.deltaY)
    if(e.deltaY < 0){

        if(n > 0){
            n = n - 1;
            for(let j = 0; j < pageList.length; j++){ //0 1 2 3 4 5
                if(j <= n){// n = 2 => pageList[2]
                    pageList[j].style.top=0+"px"; // sub 움직임은 스타일 이용 움직임
                if(j == n){
                        setTimeout(layoutInit,400)
                    }
                }else{
                    pageList[j].style.top=h+"px";
                }
            }
        }else{
            moving = false;
            return;
        }
        // console.log('UP')
    }else{
        if(n < total){
            n = n + 1;
            for(let j = 0; j < pageList.length; j++){ //0 1 2 3 4 5
                if(j <= n){// n = 2 => pageList[2]
                    pageList[j].style.top=0+"px"; // sub 움직임은 스타일 이용 움직임
                if(j == n){
                        setTimeout(layoutInit,400)
                    }
                }else{
                    pageList[j].style.top=h+"px";
                }
            }
        }else{
            moving = false;
            return;
        }
        // console.log('down')
    }

})








})