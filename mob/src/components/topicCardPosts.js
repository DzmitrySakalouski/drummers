import React from 'react'
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

export function TopicCardPosts(props) {
    const { posts=[] } = props;

    const getDateFromMiliseconds = seconds => {
        const date = new Date(parseInt(seconds));
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    }

    const renderSubtitle = item => {
        return (
            <View>
                <Text>Создано: {item.user.username}</Text>
                <Text>{getDateFromMiliseconds(item.createdAt)}</Text>
            </View>
        );
    }

    return (
        <View>
            {
                posts.map((item, i) => (
                    <ListItem
                        key={i.toString()}
                        title={item.name}
                        chevron
                        subtitle={() => renderSubtitle(item)}
                        titleStyle={styles.title}
                        leftIcon={{ name: 'check-circle', color: 'black' }}
                        bottomDivider
                    />))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '900',
        fontSize: 18,
    }
});