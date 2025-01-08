import React from 'react'
import Stepper from '../../Components/Stepper/Stepper';
import './CompletePage.css';
export const CompletePage = () => {
  return (
    <div>
      <Stepper currentStep={3} />
      <div>CompletePage</div>
    </div>
  )
}
export default CompletePage;