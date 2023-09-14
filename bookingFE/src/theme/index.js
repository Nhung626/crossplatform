const pallete = [
    {
        text: '#ecae7d',
        bgColor: opacity => `rgba(236, 174, 125, ${opacity})`
    },
    {
        text: '#334155',
        bgColor: opacity => `rgba(141, 180, 173, ${opacity})`,
    },
    {   // purple
        text: '#8db4ad',
        bgColor: opacity => `rgba(167, 139, 250, ${opacity})`,
    },
    {   // green
        text: '#009950',
        bgColor: opacity => `rgba(0, 179, 89, ${opacity})`,
    },
    {
        // teal
        text: '#14b8a6',
        bgColor: opacity => `rgba(45, 212, 191, ${opacity})`
    },
    {
        // red
        text: '#dc2626',
        bgColor: opacity => `rgba(248, 113, 113, ${opacity})`
    }

]

export const themeColor = {
    ...pallete[0]

}