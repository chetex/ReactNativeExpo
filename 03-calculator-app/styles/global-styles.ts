import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: Colors.backGround, // Background color of the app
        padding: 20, // Padding around the content
    },

    calculatorContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Aligns content to the bottom
    },

    textContainer: {
        fontSize: 24,
        fontFamily: 'SpaceMono',
        color: Colors.textPrimary, // Primary text color
    },

    mainOperation: {
        color: Colors.textPrimary, // Primary text color for main operations
        fontSize: 50,
        textAlign: 'right', // Aligns text to the right
        fontWeight: 400, // Makes the text bold
    },

    mainResult: {
        color: Colors.textSecondary, // Primary text color for results
        fontSize: 40,
        textAlign: 'right', // Aligns text to the right
        fontWeight: 300, // Makes the text bold
    },

    themeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },

    themeButton: {
        height: 80,
        width: 80,
        backgroundColor: Colors.darkGray, // Primary button color
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10, // Horizontal margin between buttons
        alignItems: 'center', // Centers text within the button
        shadowColor: Colors.shadow, // Shadow color for the button
        shadowOffset: {
            width: 0,
            height: 2, // Vertical shadow offset
        },
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius    
    },  

    buttonText: {
        color: Colors.textPrimary, // Text color for buttons
        padding: 10, // Padding around the text
        fontSize: 30, // Font size for button text 
        fontWeight: '200', // Makes the text bold 
        textAlign: 'center', // Centers text within the button
        fontFamily: 'SpaceMono', // Font family for button text
    },

    // Row style for buttons. Called in ThemeButton component
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 10
    }
});