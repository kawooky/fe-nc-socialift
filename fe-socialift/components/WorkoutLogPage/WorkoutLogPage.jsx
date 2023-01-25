import { View , Text} from 'react-native';
import { styles, theme } from './WorkoutLogPageStyle.js';
import React, { useState } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';


export const WorkoutLogPage = ({navigation}) => {



    return (
        <View style={styles.mainView}>
            <ThemeProvider theme={theme}>

            <Button
            onPress={() => {
                return navigation.navigate('WorkoutLogger')
            }}
            title="Log Workout"
            />
                            
            <Text>logged</Text>

            </ThemeProvider>
        </View>
        
        

    )
}