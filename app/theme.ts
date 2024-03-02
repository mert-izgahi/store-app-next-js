import { createTheme } from "@mantine/core";

const MODAL_SIZE = "md";
const MODAL_POSITION = "center";

const theme = createTheme({
    primaryColor: "dark",
    primaryShade: 8,
    fontFamily: "Poppins, sans-serif",
    headings: {
        fontFamily: "Poppins, sans-serif",
    },

    components: {
        Modal: {
            defaultProps: {
                size: MODAL_SIZE,
                centered: MODAL_POSITION === "center",
            },
        },
    },
});

export default theme;
