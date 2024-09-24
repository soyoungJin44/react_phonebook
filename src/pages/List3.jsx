//import 라이브러리
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import 컴포넌트
import ItemPerson from './ItemPerson';

//import css




const List3 = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    const [personList,setPersonList] = useState([]);
    //const navigate = useNavigate();

    /*---일반 메소드 --------------------------------------------*/
    const getPersonList = ()=>{

        axios({
            method: 'get', 			// put, post, delete                   
            url: 'http://localhost:9000/api/persons',
        
                                                                                                //get delete
            //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일
        
            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            //data: persons,     // put, post,  JSON(자동변환됨)
            //data: formData,           // 첨부파일  multipart방식
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            setPersonList(response.data.apiData);
        
        }).catch(error => {
            console.log(error);
        });
    };

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    useEffect(()=>{
        
        // 1.서버에서 데이터 가져오기
        getPersonList();
        
        
        // 2.html과 섞어서 출력

    }, [] );

    //(삭제버튼 클릭했을 때)
    const handleDel = (no)=>{
        console.log("del j w")

        axios({
            method: 'delete', 			// put, post, delete                   
            url: `http://localhost:9000/api/persons/${no}`,
        
                                                                                              //get delete
            //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일
        
            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            //data: guestbookVo,     // put, post,  JSON(자동변환됨)
            //data: formData,           // 첨부파일  multipart방식
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data);
            console.log("//////////////////////////////");
            //리다이렉트 (같은 페이지에서는 리다이렉트는 안된다)
            //Navigate("/list");
            //getPersonList();

            if(response.data.result === 'success'){
                let newArray = personList.filter((person)=>{
                    return person.personId !== no
                });
                    
                setPersonList(newArray);
                
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

    return (
        <>
            <h1>전화번호부</h1>

            <h2>전화번호-리스트</h2>

            <p>등록된 전화번호 리스트 입니다.</p>
                
                {personList.map((personVo)=>{
                    return(
                        <div>
                            <ItemPerson key={personVo.personId}
                                        person={personVo} 
                                        delPerson = {handleDel} />
                            {/* person : 보낼이름 정함, personVo: 보내는 값 */}
                        </div>
                    )
                })}
                    
            <Link to="/writeForm" rel="noopener">등록폼으로 이동</Link>
        </>
    );
}

export default List3;
