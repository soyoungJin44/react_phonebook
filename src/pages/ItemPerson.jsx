//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';

//import 컴포넌트


//import css


// 1. props : 보낸 personVo 받는 값
// 2. 받은 props에서 값 꺼내서 person에 담아주기


const ItemPerson = (props) => {

    /* ---라우터 관련 ------ */

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    const {person, delPerson} = props;   //보낼때 이름이랑 같게 꺼내기   ** 여러가지 값, 행동 을 보내도 props 한개로 다 담아온다
    
    console.log(delPerson)

    /*---일반 메소드 --------------------------------------------*/
    

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/



    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    return (
        <>
            <table border="1">
                <tbody>
                    <tr>
                        <th>이름(name)</th>
                        <td>{person.name}</td>
                    </tr>
                    <tr>
                        <th>핸드폰(hp)</th>
                        <td>{person.hp}</td>
                    </tr>
                    <tr>
                        <th>회사(company)</th>
                        <td>{person.company}</td>
                        
                    </tr>
                    <tr>
                        <td><Link to={`/editForm/${person.personId}`}>[수정폼으로 이동]</Link></td>
                        <td><button type="button" onClick={()=>{return delPerson(person.personId)}} >삭제</button></td> {/* 바로 실행되면 안되기때문에 한번 싸주기*/}
                    </tr>

                </tbody>
            </table>
            <br /> <br />
        </>
    );
}

export default ItemPerson;
