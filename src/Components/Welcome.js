import {SiEthereum} from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";
import { useState, useEffect} from "react";
import { ethers } from "ethers";
import {Loader} from './';
  

const Welcome = () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const [connected, setConnected] = useState(false);
    const [id, setId] = useState(null);
    const [balance, setBalance] = useState(null)
    const [sender, setSender] = useState("")
    const [receiver, setReceiver] = useState("")
    const [amount, setAmount] = useState("")

    useEffect(()=> {
      console.log("isWalletConnected: ", localStorage.getItem('isWalletConnected') )
      const refreshingPage = async () => {
        if(localStorage.getItem('isWalletConnected') === true) {
          if (window.ethereum) {

            // res[0] for fetching a first wallet
            // .request({ method: "eth_requestAccounts" })

            window.ethereum.request({method: 'eth_requestAccounts'})
            .then((res) => {
                const displayAddress = res[0]?.substr(0, 6) + "..."
                setSender(res[0])
                setId(displayAddress)
                console.log(res[0])
                getbalance(res[0])
                setConnected(true)
                  })
            .catch((error) => {
              alert("error while refreshing the page")
                });
                   
      } else {
          alert("install metamask extension!!");
      }} 
      else if(!localStorage.getItem("isWalletConnected")){
        console.log("deconnexion")
        setId(null)
        setBalance(null)
      }
        
      } 
      refreshingPage()
    },[])

    const connectWallet = () => {
      // Asking if metamask is already present or not
      console.log("connexion status is: ",connected)
      if( !connected){
        if (window.ethereum) {

              // res[0] for fetching a first wallet
          
              window.ethereum
              // .request({ method: "eth_requestAccounts" })
              .request({method: 'wallet_requestPermissions', 
              params: [{
                eth_accounts: {}
              }]
              }).then(() => {
                    window.ethereum.request({method: 'eth_requestAccounts'})
                    .then((res) => {
                      const displayAddress = res[0]?.substr(0, 6) + "..."
                      setSender(res[0])
                      setId(displayAddress)
                      console.log(res[0])
                      getbalance(res[0])
                      setConnected(true)
                      localStorage.setItem('isWalletConnected',true) 
                    })
                  }).catch((error) => {
                    alert("Permission denied !!")
                  });
                     
        } else {
          alert("install metamask extension!!");
        }
        } else {
          setConnected(false)
          localStorage.setItem('isWalletConnected', false)
          setId(null)
          setBalance(null)
        }
    };

  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
        .request({
            method: "eth_getBalance",
            params: [address, "latest"],
        })
        .then((balance) => {
            // setting balance
            setBalance(ethers.formatEther(balance));
        });
};
  const sendTransaction = () => {
    
    if(connected){
      const tx = {
        from: sender,
        to: receiver,
        //transforming amount to Gwei
        value: (amount *Math.pow(10,18)).toString(16),
        gas: '0x5208'
      }
      window.ethereum.request
      ({ method: 'eth_sendTransaction', params: [tx]})
      .catch((error)=> {

        console.log("l erreur est ", error)
        if(error.code === 4001) {
          alert(`Transaction denied !! `)
        }
        if(error.code === -32602) {
          alert(`Verify the user address !! `)
        }
      })
    }else {
      alert("Connect to your metamask wallet")
    }
    setReceiver("")
    setAmount("")
    delay(5000)
  }


    
    return (
        <div className="flex w-full justify-center">
          <div className="flex md:flex-row flex-col items-start justify-between md:p-5 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Connect your Metamask wallet and start sending ethers.
                    </p>
                    <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <p className="text-white text-base font-semibold">{connected ? "Disconnect" : "Connect" }</p>
                    </button>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                  <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                    <div className="flex justify-between flex-col w-full h-full">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                          <SiEthereum fontSize={21} color="#fff" />
                        </div>
                        <BsInfoCircle fontSize={17} color="#fff" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Account Details:
                        </p>
                        <p className="text-white font-light text-sm">
                          {/* {currentAccount} */}{id==null ? "..." : `${id}`} 
                        </p>
                        <p className="text-white font-semibold text-sm">
                          {/* {currentAccount} */}{id==null ? "..." : `balance: ${balance}`} 
                        </p>
                        <p className="text-white font-semibold text-lg mt-1">
                          Ethereum
                        </p>
                      </div>
                  </div>
                </div>
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                  <input 
                    className= "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" 
                    placeholder="Address To" 
                    type="text" 
                    name="addressTo" 
                    value={receiver} 
                    onChange={(e) => setReceiver(e.target.value)} 
                  />
                  <input 
                    className= "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" 
                    step ="0.0001" 
                    placeholder ="Amount (ETH)"
                    name="amount"
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                  />
                  <div className="h-[1px] w-full bg-gray-400 my-2" />
                      {false
                      ? <Loader />
                      : (
                          <button
                          type="button"
                          onClick={sendTransaction}
                          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                          >
                          Send now
                          </button>
                        )}
                </div>
             </div>
            </div>
        </div>
    )
}

export default Welcome;