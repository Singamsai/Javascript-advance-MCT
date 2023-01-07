const statsData = document.getElementById('stats_data');
const qnaData = document.getElementById('qna_data');
const qnaRes = document.getElementById('qna_res');
const statsRes = document.getElementById('stats_res');
const resWindow = document.getElementById('main2');
const qnCount = document.getElementById('qn_count');
const body = document.getElementsByTagName('body');
const table = document.getElementById('res_table');

const category = document.getElementById('category');
const noOfQn = document.getElementById('no_of_qns');
const difficulty = document.getElementById('difficulty_level');
const QnType = document.getElementById('q_type');
const hour = document.getElementById('hour');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const playbutton = document.getElementById('buttons');
const qnWindow = document.getElementById('main');
const selectWindow = document.getElementById('main_container');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const hr = document.getElementById('hr');
const nextQn = document.getElementById('next_qn');
const totalQns = document.getElementById('no_of_qnscount');
const crctMarked = document.getElementById('no_of_crctans');
const score = document.getElementById('score');
const message = document.getElementById('message');
const grade =  document.getElementById('grade');
const rePlay = document.getElementById('replay');

let qnTypevalue = QnType.value;
let qnValue = noOfQn.value;
playbutton.addEventListener('click', qnfunction);
function qnfunction(){
    selectWindow.style.display='none';
    qnWindow.style.display='block';
    let hourValue = hour.value;
    let minuteValue=minutes.value-1;
    if(minutes.value>0){
        min.innerHTML=minutes.value-1;
    }else{
        min.innerHTML=minutes.value;
    }
    hr.innerHTML = hourValue;
    let count=60;
    if(minuteValue>0){        
        const timer=setInterval(()=>{
            count--;
            sec.innerHTML=count;
            if(minuteValue==0  && count==0 && hourValue==0){
                qnWindow.style.display='none';
                resWindow.style.display='flex';
                clearInterval(timer);
            }
            if(count==0 && min.innerHTML>0){
                minuteValue--;
                count=60;
                min.innerHTML= minuteValue;
            }
            
        },1000)
    }
    api();
}
    noOfQn.addEventListener('change',(e)=>{
        qnValue = e.target.value;
    })
    console.log(qnValue);
    QnType.addEventListener('change',(e)=>{
        qnTypevalue = e.target.value;
        if(qnTypevalue=='boolean'){
            option3.style.display='none';
            option4.style.display='none';
        }
    })
const qn = document.getElementById('qn1');
const option1 = document.getElementById('qn_opt1');
const option2 = document.getElementById('qn_opt2');
const option3 = document.getElementById('qn_opt3');
const option4 = document.getElementById('qn_opt4');

let counter =0;
let ansCount = 0;
let html='';
async function api(){
    const streamResponse = await fetch(`https://opentdb.com/api.php?amount=${noOfQn.value}&category=9&difficulty=0&type=${qnTypevalue}`)
    const textBody = await streamResponse.text()
    const jsonData = JSON.parse(textBody);
    console.log(jsonData);
    qn.innerHTML='Q.'+jsonData.results[0].question;
    option2.innerHTML ='B. '+ jsonData.results[0].correct_answer;
    option1.innerHTML ='A. '+ jsonData.results[0].incorrect_answers[0];
    option3.innerHTML ='C. '+jsonData.results[0].incorrect_answers[1];
    option4.innerHTML ='D. '+jsonData.results[0].incorrect_answers[2];
    var clickedAns = jsonData.results[0].incorrect_answers[0];    
    var crctAns =jsonData.results[0].correct_answer;
    var crctAnscount = 0;
    qnWindow.addEventListener('click',(e)=>{
        if(e.target.id==='qn_opt2'){
            clickedAns = `${jsonData.results[1].correct_answer}`;
        }
         else if(e.target.id==='qn_opt1'){
            clickedAns = `${jsonData.results[1].incorrect_answers[0]}`;
        }
         else if(e.target.id==='qn_opt3'){
            clickedAns = `${jsonData.results[1].incorrect_answers[1]}`;
        }
         else if(e.target.id==='qn_opt4'){
            clickedAns = `${jsonData.results[1].incorrect_answers[2]}`;
        }
        else{
            clickedAns='';
        }
    })  
    if(crctAns==clickedAns){
        crctAnscount=1;
    }else{
        crctAnscount=0;
    }
    html =`<tr>
    <td>1</td>
    <td>${jsonData.results[0].question}</td>
    <td>${clickedAns}</td>
    <td>${jsonData.results[0].correct_answer}</td>
    <td>${crctAnscount}</td>    
    </tr>`;
    table.innerHTML+=html;
    qnCount.innerText='Question No.'+`${counter+1}`+' of '+`${qnValue}`;
        nextQn.addEventListener('click',(e)=>{
            if(counter+1<qnValue){
            counter++;        
            qn.innerHTML='Q.'+jsonData.results[counter].question;
            option2.innerHTML ='B. '+ jsonData.results[counter].correct_answer;
            option1.innerHTML ='A. '+ jsonData.results[counter].incorrect_answers[0];
            option3.innerHTML ='C. '+jsonData.results[counter].incorrect_answers[1];
            option4.innerHTML ='D. '+jsonData.results[counter].incorrect_answers[2];
            qnCount.innerText='Question No.'+`${counter+1}`+' of '+`${qnValue}`;
            crctAns =jsonData.results[counter].correct_answer;

            if(crctAns==clickedAns){
                crctAnscount=1;
            }else{
                crctAnscount=0;
            }
            qnWindow.addEventListener('click',(e)=>{
                if(e.target.id==='qn_opt2'){
                    ansCount++;
                    clickedAns = `${jsonData.results[counter+1].correct_answer}`;
                }
                else if(e.target.id==='qn_opt1'){
                    clickedAns = `${jsonData.results[counter+1].incorrect_answers[0]}`;
                }
                else if(e.target.id==='qn_opt3'){
                    clickedAns = `${jsonData.results[counter+1].incorrect_answers[1]}`;
                }
                else if(e.target.id==='qn_opt4'){
                    clickedAns = `${jsonData.results[counter+1].incorrect_answers[2]}`;
                }
                else{
                    clickedAns='';
                }
            }) 
            let html =`<tr>
                            <td>${counter+1}</td>
                            <td>${jsonData.results[counter].question}</td>
                            <td>${clickedAns}</td>
                            <td>${jsonData.results[counter].correct_answer}</td>
                            <td>${crctAnscount}</td>    
                        </tr>`;
            table.innerHTML += html;
            
        }else{
                qnWindow.style.display='none';
                resWindow.style.display='flex';
                totalQns.innerHTML="Total Questions: "+ `${counter+1}`;
                crctMarked.innerHTML="Correct Answers: "+`${ansCount}`;
                let percentage = (Number)((ansCount/(counter+1))*100);
                score.innerHTML = 'Your score: '+percentage.toFixed(0)+'%';
                if(percentage>60){
                    message.innerHTML='Congratulations, YOU PASSED';
                    grade.innerHTML='Grade:A';
                }else{
                    message.innerHTML='Sorry, YOU FAILED!';
                    grade.innerHTML='Grade:B';
                }
                rePlay.addEventListener('click',qnfunction);
                
        }
    })
}
qnaRes.addEventListener('click', ()=>{
    qnaData.style.display='block';
    statsData.style.display='none';
})
statsRes.addEventListener('click',()=>{
    qnaData.style.display='none';
    statsData.style.display='block';
})
let vavvvv=(Number)(8/15)*100;
console.log(vavvvv.toFixed(0));


