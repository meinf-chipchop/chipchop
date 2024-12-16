import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  label?: string
  labelClassName?: string
  children?: React.ReactNode,
  childrenStart?: React.ReactNode,
  childrenEnd?: React.ReactNode,
  className?: string,
}

const CButton = React.memo(({ label, labelClassName, childrenStart, children, childrenEnd, className, ...props }: ButtonProps) => {
  return (
    <Pressable {...props} style={styles.button} className={className}>
      {childrenStart}
      {label && !children && <Text style={styles.label} className={labelClassName}>{label}</Text>}
      {children}
      {childrenEnd}
    </Pressable>
  )
})

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.chestnut[400],
    borderRadius: 999,
    padding: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.chestnut[50],
    padding: 10,
    textAlign: 'center',
  }
})



export default CButton


