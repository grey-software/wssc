const COLORS = {
    primary: "#22c55e",
    secondary: "#B8F2B5",

    gray: "#83829A",
    gray2: "#C1C0C8",

    white: "#F3F4F8",
    lightWhite: "#FAFAFC",
    headingColor: {
        400: "#182F35",
        500: "#112429",
    },
    DeleteButton: {
        100: "#ECECEC",
        300: "#FF0000",
    },
    initiatedColor: "#FBB64F",
    inprogessColor: "#00A6FF",
    completedColor: "#6AD616",
    feedbackColor: "#1A5980",
    closedColor: "#D43434",
};

const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
};

const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};

export { COLORS, FONT, SIZES, SHADOWS };