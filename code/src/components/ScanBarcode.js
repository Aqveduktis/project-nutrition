import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { BarcodeScanner } from './BarcodeScanner'
import {productStore, fetchData} from '../reducers/productStore'
import styled from 'styled-components'


const Button = styled.button`
  background-color: darkorange;
  color: white;
  padding: 5px;
  border-radius: 3px;
  font-weight: bold;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: orange;
    color: black;
  }
`

export const ScanBarcode = () => {
  //const [showScanner, setShowScanner] = useState(false)
  //const codes = useSelector((state) => state.productStore.scannedProducts);
  const cameraOn = useSelector((state)=>state.productStore.camera)
  const [ products, setProducts ] = useState([]);
	const dispatch = useDispatch();

  //dispatch(fetchData(code))

  const onDetected = (code) => {
		 console.log(`Code: ${code}`);
		// fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
		// 	.then((data) => data.json())
		// 	.then((json) => {
		// 		// console.log(json.status);
		// 		// products.push(json);
		// 		// console.log(products);
		// 		if (json.status === 1) {
    //       products.push(json);
    //       // setProducts([json])
    //       // console.log('This is the useState:', products);
    //       setShowScanner(false)
    //       dispatch(productStore.actions.addProduct(products.find((item) => item.status === 1)));
    //       setProducts([])
		// 		}
				
    // 	});
    dispatch(fetchData(code))
	};

  return (
    <>
      {!cameraOn && (
        <Button onClick={() => dispatch(productStore.actions.startCamera())}>
        Show scanner
        </Button>
      )}

      {cameraOn && (
        <>
        <Button onClick={() => dispatch(productStore.actions.stopCamera())}>
          Stop scanner
        </Button>
        <BarcodeScanner onDetected={(code) => {
          onDetected(code)
        }} />
  
        </>
      )}
    </>
  )
}