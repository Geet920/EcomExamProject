import React from 'react'

const Success = () => {
  return (
    <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <button style = {{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "green",
            color: "white",
            fontWeight: "600",
            
        }}>
            Successful
        </button>
        <p >
            Your order is bring prepared. Thank you
        </p>
    </div>
  )
}

export default Success;