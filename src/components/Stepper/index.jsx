import PropTypes from 'prop-types';
import { useState } from 'react';
import CustomLoadingButton from 'components/Button/LoadingButton';
import { Box, Button, Stepper, Step, StepButton } from '@mui/material';

const CustomStepper = ({ steps, customAction, loading }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => steps.length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const completedSteps = () => Object.keys(completed).length;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, index) => !(index in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box style={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {step.label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            <div>
                {steps.map((step, index) => (
                    <div style={{ display: `${index === activeStep ? 'block' : 'none'}` }} key={`l-${step.label}`}>
                        {step.component}
                    </div>
                ))}

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button type="button" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                        Regresar
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {customAction && (
                        <Button type="button" sx={{ display: 'inline-block' }} onClick={customAction.action}>
                            {customAction.label}
                        </Button>
                    )}
                    <Button type="button" sx={{ display: isLastStep() ? 'none' : 'inline-block' }} onClick={handleNext}>
                        Siguiente
                    </Button>

                    <CustomLoadingButton
                        loading={loading}
                        variant="text"
                        type="submit"
                        sx={{ display: isLastStep() ? 'inline-block' : 'none', textTransform: 'capitalize' }}
                    >
                        Terminar
                    </CustomLoadingButton>
                </Box>
            </div>
        </Box>
    );
};

CustomStepper.defaultProps = {
    loading: false
};

CustomStepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            label: PropTypes.string.isRequired,
            component: PropTypes.element.isRequired
        }).isRequired
    ).isRequired,
    customAction: PropTypes.object,
    loading: PropTypes.bool
};

export default CustomStepper;
