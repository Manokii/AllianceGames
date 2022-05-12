import {
  Affix,
  Burger,
  Drawer,
  Stack,
  Title,
  Text,
  Divider,
} from "@mantine/core"
import { useHotkeys, useToggle } from "@mantine/hooks"
import { useMatches } from "utils/hooks"
import MatchCard from "../match/MatchCard.ui"

const LiveDrawer = () => {
  const [opened, toggle] = useToggle(false, [true, false])
  const close = () => toggle(false)
  useHotkeys([["mod+L", () => toggle()]])
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }} zIndex={999}>
        <Burger opened={opened} onClick={() => toggle()} />
      </Affix>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        padding="xl"
        size="xl"
        title="Live Settings"
        sx={{ overflowY: "auto" }}
      >
        <DrawerContent />
      </Drawer>
    </>
  )
}

const DrawerContent = () => {
  const { activeMatch, nextMatch, schedule } = useMatches()

  return (
    <Stack spacing="xl" pr="xl" sx={{ height: "100%", overflowY: "auto" }}>
      <Stack spacing="xs">
        <Title order={4}>Active Match</Title>
        {activeMatch ? (
          <MatchCard match={activeMatch} />
        ) : (
          <Text align="center">No active match selected.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Title order={4}>Next Match</Title>
        {nextMatch ? (
          <MatchCard match={nextMatch} small withBorder />
        ) : (
          <Text align="center">Next match not yet selected.</Text>
        )}
      </Stack>
      <Divider variant="dashed" />
      <Stack>
        <Title order={4}>Schedule</Title>
        {schedule.length ? (
          schedule.map((match) => <MatchCard small match={match} withBorder />)
        ) : (
          <Text align="center">No schedule yet.</Text>
        )}
      </Stack>
    </Stack>
  )
}
export default LiveDrawer
