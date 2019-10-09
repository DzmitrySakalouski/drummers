import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';
import { TopicCardPosts } from './topicCardPosts';

export function TopicCard(props) {
    const handleAddNewPost = () => {
        const { id } = props;
        props.openAddPostForm(id)
    }

    const renderTitle = () => {
        return (
            <View style={styles.customTitle}>
                <Text style={[styles.titleItem, { fontSize: 35, fontWeight: '900' }]}>{props.name}</Text>
                <Icon 
                    containerStyle={styles.titleItem}
                    name="note-add"
                    color="black"
                    size={40}
                    onPress={handleAddNewPost} />
            </View>
        );
    }
    return (
        <Card 
            image={{uri: 'http://content.onliner.by/forum/531/e84/1307241/800x800/6e555a1e4ebabe84deafb6cd1f337c70.jpg'}}
            title={renderTitle()}
        >
            <TopicCardPosts posts={props.postsForCard}/>
            <Button buttonStyle={styles.cardBtn} title="Eщё..."/>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardBtn: {
        backgroundColor: 'black'
    },
    customTitle: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    titleItem: {
        marginHorizontal: 15
    }
});