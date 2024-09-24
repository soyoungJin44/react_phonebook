//import 라이브러리
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';   //리다이렉트
import axios from 'axios';


//import 컴포넌트


//import css





const WriteForm = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    const [name,setName] = useState("");
    const [hp, setHp] = useState("");
    const [company, setCompany] = useState("");

    const navigate = useNavigate();

    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const handleName = (e)=>{
        console.log('name j w')
        setName(e.target.value);
    };
    const handleHp = (e)=>{
        setHp(e.target.value);
    };
    const handleCompany = (e)=>{
        setCompany(e.target.value);
    };


    const handleAdd = (e)=>{
        
        e.preventDefault()

        const personVo = {
            name: name,
            hp: hp,
            company: company
        }
        console.log(personVo);

        //서버로 전송 (insert)
        axios({
            method: 'post', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons',
        
                                                                                              //get delete
            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일
        
            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            data: personVo,     // put, post,  JSON(자동변환됨)
            //data: formData,           // 첨부파일  multipart방식
        
            responseType: 'json' //수신타입 (json으로 받을게 )
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data);

            if(response.data === 1){
                //리다이랙트
                navigate("/list3");

            }else {
                alert("등록실패다 이놈아")
            }
        
        }).catch(error => {
            console.log(error);
        });
        



    };


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    return (
        <>
            <h1>전화번호부</h1>

            <h2>전화번호-등록폼</h2>

            <p>아래의 항목을 입력한 후 등록버튼을 클릭해 주세요</p>

            <form action="" method="get" onSubmit={handleAdd}>
                <div>
                    <label htmlFor="txt-name">이름(name):</label> 
                    <input id="txt-name" type="text" name="name" value={name} placeholder="이름" onChange={handleName} />
                </div>
                
                <div>
                    <label htmlFor="txt-hp">핸드폰(hp):</label> 
                    <input id="txt-hp" type="text" name="hp" value={hp} placeholder="핸드폰" onChange={handleHp} />
                </div>
                
                <div>
                    <label htmlFor="txt-company">회사(company):</label> 
                    <input id="txt-company" type="text" name="company" value={company} placeholder="회사" onChange={handleCompany} />
                </div>
                <br />
                <button type="submit">등록(전송)</button>
            </form>


            <br /><br />
            <Link to="/list3" rel="noopener">리스트로 가기</Link>
        </>
    );
}

export default WriteForm;
