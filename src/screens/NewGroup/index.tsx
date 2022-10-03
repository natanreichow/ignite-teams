import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [groupName, setGroupName] = useState('')

  const navigation = useNavigation()

  async function handleCreateNewGroup() {
    try {
      if (groupName.trim().length === 0) {
        return Alert.alert('New Team', 'Type name of the team')
      }

      await groupCreate(groupName)
      navigation.navigate('players', { group: groupName })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Team', error.message)
      } else {
        Alert.alert('New Team', 'It was not possible to create a new team')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New Team"
          subtitle="Create a team to add participants"
        />

        <Input
          placeholder="Team name"
          onChangeText={setGroupName}
        />

        <Button
          title='Create'
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  )
}