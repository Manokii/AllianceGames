import {
  ActionIcon,
  Button,
  Card,
  CardProps,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"
import { useState } from "react"
import { Plus } from "tabler-icons-react"
import { usePermission } from "../../hooks/usePermission.hook"
import PlayerAvatar from "../player/PlayerAvatar.ui"
import PlayerFormPopover from "../player/PlayerFormPopover.ui"
import ParticipantModal from "./ParticipantModal.ui"

interface ParticipantCardProps {
  team: SanitizedParticipant
  CardProps?: CardProps<"div">
}
const ParticipantCard = ({ CardProps, team }: ParticipantCardProps) => {
  const isAllowed = usePermission()
  const [createOpened, setCreateOpened] = useState(false)
  const openCreate = () => setCreateOpened(true)
  const closeCreate = () => setCreateOpened(false)
  return (
    <Card shadow="sm" {...CardProps}>
      <Stack>
        <Image src={team.logo} height={60} width={60} radius="md" />
        <Text>{team.name}</Text>

        <Button onClick={openCreate} size="xs" disabled={!isAllowed}>
          Edit Details
        </Button>
        <ParticipantModal
          participant={team}
          opened={createOpened}
          onClose={closeCreate}
        />
      </Stack>
    </Card>
  )
}
export default ParticipantCard
