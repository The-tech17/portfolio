# Contact Form Functional Test Log

## Form Input Validation Test Cases

| Test ID | Input Payload | Expected Behavior | Actual Behavior | Status |
| :--- | :--- | :--- | :--- | :--- |
| `TC-F01` | All fields empty | Blocks submit, highlights missing input | Displayed inline warning banner | **PASSED** |
| `TC-F02` | Invalid email: `sanjana@` | Blocks submit, prompts valid email format | Triggers email syntax alert | **PASSED** |
| `TC-F03` | Valid name, email & message | Submits payload, displays success toast, clears form | Displayed "Message sent successfully!" toast | **PASSED** |
| `TC-F04` | 5 consecutive rapid clicks | Disables submit button during processing | Disables button state | **PASSED** |
