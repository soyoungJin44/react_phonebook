//import 라이브러리
import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트


//import css





const EditForm = () => {

    /* 라우터 관련*/
    const { no } = useParams();
    const navigate = useNavigate();
    
    

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    const [name,setName] = useState("");
    const [hp, setHp] = useState("");
    const [company, setCompany] = useState("");

    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const handleName = (e)=>{
        setName(e.target.value);
    };
    const handleHp = (e)=>{
        setHp(e.target.value);
    };
    const handleCompany = (e)=>{
        setCompany(e.target.value);
    };
        
    
    
    
    
    const handleUpdate = (e)=>{
        console.log("수정버튼 클릭")
        e.preventDefault();
        
        const newPersonVo = {
            name: name,
            hp: hp,
            company: company
        }

        console.log(newPersonVo)

        // === 서버로 전송해주기

        axios({
            method: 'put', 			// put, post, delete                   
            url: `http://localhost:9000/api/persons/${no}`,
        
                                                                                              //get delete
            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일
        
            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            data: newPersonVo,     // put, post,  JSON(자동변환됨)
            //data: formData,           // 첨부파일  multipart방식
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data);

            if(response.data.apiData === 1){
                navigate('/list')
            }else{
                alert(response.data.message);
            }
        
        }).catch(error => {
            console.log(error);
        });
        
        

    };
    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    /// 로딩 >> 마운트 되었을 때
    useEffect(()=>{
        console.log("마운트 되었을때")
        console.log(no);

        axios({
            method: 'get', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons/'+no,
        
                                                                                              //get delete
            //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일
        
            //***** 수정 폼에서 보낼값은 no값 한개인데, !!주소!! 에 같이 보내버리면 되기 때문에 따로 !!!파라미터로 보낼 값은 없다.!!! */
            //params: personVo, // get delete 쿼리스트링(파라미터)
            //data: guestbookVo,     // put, post,  JSON(자동변환됨)
            //data: formData,           // 첨부파일  multipart방식
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data);
            //console.log(response.data.apiData.name);    //이름 꺼낼 때 
            
            if(response.data.result === 'success'){
                //성공로직 짜주기
                setName(response.data.apiData.name);
                setHp(response.data.apiData.hp);
                setCompany(response.data.apiData.company);

            }else{
                //실패로직 짜주기
                navigate("/list");  //없는 no값일 때 list로 리다이랙트 시켜주기
            
            }
                

        }).catch(error => {
            console.log(error);
        });

    }, []); 

    return (
        <>
            <h1>전화번호부</h1>

            <h2>전화번호-수정폼</h2>

            <p>수정할 항목을 입력한 후 수정버튼을 클릭해 주세요</p>

            <form action="" method="put" onSubmit={handleUpdate}>
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
                
                
                
                <input type="hidden" name="personId" value="" />
                <br />
                <button type="submit">수정(전송)</button>
            </form>

            <br /><br />
            <Link to="/list3" rel="noreferrer noopener">리스트로 가기</Link>
        </>
    );
}

export default EditForm;
