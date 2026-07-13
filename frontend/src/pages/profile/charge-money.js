import React,{useState,useEffect}   from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {
    ProfileOutlined,
  } from '@ant-design/icons';
import Loading from '../../components/loading';
import { chargeMoney } from '../../redux/actions/profileAction';
import { getInformation } from '../../redux/actions/profileAction';
import { Row,Col,Button } from 'antd';
function MyWallet(props) {
    const [balance, setBalance]=useState(0);
    useEffect(() => {
        props.getInformation(props.profile.data.email)
    }, [])
    const onCharge = () =>{
        props.chargeMoney(balance);
        // console.log(props.profile)
    }
    return (

        <Row>
            <Col md={{span: 14}} sm={{span: 24}}>
            
            <div style={{textAlign:"center",fontSize:"40px"}}>
                <ProfileOutlined  /> <span  >MY WALLET</span>
            </div>
            <Row style={{paddingTop:"30px"}}>
                <Col md={{span: 12}} sm={{span: 24}} style={{textAlign:"center",fontSize:"20px",paddingTop:"70px",borderRight:"1px solid black"}}>
                    <div>balance:{ props.profile.data.balance}$</div>
                </Col>
                <Col md={{span: 12}} sm={{span: 24}} style={{textAlign:"center",fontSize:"20px",paddingTop:"70px",paddingLeft:"50px"}}>
                    <div style={{paddingBottom:"20px"}}>balance:{ props.profile.data.balance}$</div>
                    <div style={{display:"flex"}}>
                        <input  placeholder='Charge Money:' onChange = {e => setBalance(e.target.value)}/>
                        <Button style={{height:"40px"}}
                              onClick = {() => {
                                onCharge()
                            }} >
                                CHARGE
                        </Button>
                    </div>
                
                    
                </Col>
                {
                    props.profile.isLoading? <Loading />: <></>
                }
            </Row>
            </Col>
        </Row>

                    
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getInformation,chargeMoney})(withRouter(MyWallet));