import React from 'react'
import { Button, ButtonText } from './ui/button'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from './ui/alert-dialog'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import { Text } from 'react-native'

type DateTimePickerProps = {
  header: string
  date: DateType
  onDate: (date: DateType) => void
}

export const DatePicker = ({ header, date, onDate }: DateTimePickerProps) => {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const handleClose = () => setShowAlertDialog(false)
  return (
    <>
      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Open Dialog</ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text>{header}</Text>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params) => {
                setShowAlertDialog(false)
                onDate(params.date)
              }}
            />
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button size="sm" onPress={handleClose}>
              <ButtonText>Close</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default DatePicker
