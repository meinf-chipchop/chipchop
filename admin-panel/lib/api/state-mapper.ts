export function mapState(state: string): 'pending' | 'approved' | 'rejected' {
    switch (state) {
        case 'P':
            return 'pending';
        case 'A':
            return 'approved';
        default:
            return 'rejected';
    }
}