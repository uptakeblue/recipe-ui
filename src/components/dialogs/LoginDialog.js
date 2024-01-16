// general
import { useState, useContext } from "react";

// mui
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Dialog from '@mui/material/Dialog';
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from '@mui/material/TextField';

// components
import { CustomColorScheme } from '../CustomTheme';
import { AuthContext } from "../../AuthContext";

export default function LoginDialog(props) {
    const {
        dialogOpen,
        setDialogOpen,
    } = props;

    const [username, setUsername] = useState(
        localStorage.getItem("username") !== null
            ? JSON.parse(localStorage.getItem("username"))
            : ""
    );
    const [password, setPassword] = useState("");

    const [saveUsername, setSaveUsername] = useState(
        localStorage.getItem("saveUsername") !== null
            ? JSON.parse(localStorage.getItem("saveUsername"))
            : false
    );

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("")

    const { signIn, user } = useContext(AuthContext)


    // event handlers ///////

    const handleLogin = async (e) => {
        e.preventDefault();
        let isError = false
        if (!username) {
            setUsernameError("Usename is required **");
            isError = true
        }
        if (!password) {
            setPasswordError("Password is required **");
            isError = true
        }
        localStorage.setItem("saveUsername", JSON.stringify(saveUsername));
        if (!isError) {
            localStorage.setItem("username", JSON.stringify(username));
            try {
                await signIn(username, password)
                handleDialogClose();
            } catch (err) {
                console.log(err.message, username, password)
                setError(err.message)
            }
        } else {
            handleDialogClose();
        }
    }

    const handleUsernameMousedown = () => {
        setUsernameError("");
        setError("");
    }

    const handlePasswordMousedown = () => {
        setPasswordError("");
        setError("");
    }

    const handleDialogClose = () => {
        setPassword('');
        setDialogOpen(false);
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            maxWidth='xl'
        >


            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
                minHeight={450}
                backgroundColor={CustomColorScheme['darkBrown']}
            >
                <Typography
                    variant='h4'
                    sx={{
                        color: CustomColorScheme['amber'],
                        marginY: 1,
                    }}
                >
                    Admin Login
                </Typography>
                <Paper
                    sx={{
                        minWidth: 325,
                        backgroundColor: CustomColorScheme['tan'],
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Stack
                        spacing={2}
                        paddingX={2}
                        paddingY={3}
                    >
                        <Stack
                            padding={1.5}
                        >
                            <TextField
                                error={Boolean(usernameError)}
                                label="Username"
                                variant='standard'
                                value={username}
                                onMouseDown={handleUsernameMousedown}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                                inputProps={{
                                    style: {
                                        paddingLeft: 8
                                    }
                                }}
                                sx={{
                                    backgroundColor: CustomColorScheme['white'],
                                    '& .MuiFormLabel-root': {
                                        marginLeft: 1,
                                    },
                                    '& .MuiFilledInput-root': {

                                    },
                                    '& label.Mui-focused': {
                                        color: 'inherit',
                                        marginLeft: 1,
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: CustomColorScheme['text'],
                                    },
                                }}
                            />
                            <label
                                style={{
                                    color: CustomColorScheme['red'],
                                    paddingLeft: 5,
                                    paddingTop: 5,
                                    height: 15,
                                }}
                            >{usernameError}</label>
                        </Stack>
                        <Stack
                            paddingX={1.5}
                        >
                            <TextField
                                error={Boolean(passwordError)}
                                label="Password"
                                variant='standard'
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onMouseDown={handlePasswordMousedown}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        handleLogin(e);
                                    }
                                }}
                                inputProps={{
                                    style: {
                                        paddingLeft: 10,
                                        fontSize: 24,
                                    }
                                }}
                                sx={{
                                    backgroundColor: CustomColorScheme['white'],
                                    '& .MuiFormLabel-root': {
                                        margin: 1,
                                        marginTop: 0,
                                    },
                                    '& .MuiFilledInput-root': {

                                    },
                                    '& label.Mui-focused': {
                                        color: 'inherit',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: CustomColorScheme['text'],
                                    },
                                }}
                            />
                            <label
                                style={{
                                    color: CustomColorScheme['red'],
                                    paddingLeft: 5,
                                    paddingTop: 5,
                                    height: 15,
                                }}
                            >{passwordError}</label>
                        </Stack>
                        <Typography
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            // border={1}
                            height={25}
                            color='error'
                        >
                            {error}
                        </Typography>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <FormControlLabel
                                padding={0}
                                sx={{
                                    color: CustomColorScheme['darkestBrown'],
                                }}
                                control={
                                    <Checkbox
                                        checked={saveUsername}
                                        onChange={(e) => setSaveUsername(e.currentTarget.checked)}
                                        sx={{
                                            color: CustomColorScheme['darkestBrown'],
                                            '&.Mui-checked': {
                                                color: CustomColorScheme['darkestBrown'],
                                            }
                                        }}
                                    />} label="Remember Username" />
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Button
                                onClick={handleLogin}
                                variant='contained'
                                sx={{
                                    width: 200,
                                    color: CustomColorScheme['white'],
                                    backgroundColor: CustomColorScheme['darkestBrown'],
                                    '&:hover': {
                                        backgroundColor: CustomColorScheme['darkestBrown'],
                                        color: CustomColorScheme['amber'],
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Stack>
                </Paper >
            </Box >
        </Dialog>
    )

}