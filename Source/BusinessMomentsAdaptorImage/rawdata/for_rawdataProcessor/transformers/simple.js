({
    Name: 'simple transformer',
    Filter: (input) => {
        if (input.importantPersonName === 'John Carmack') {
            return true;
        }
        return false;
    },
    Transform: (input) => {
        if (input.employeeName === 'John Carmack') {
            return {
                companyName: 'Id Software'
            }
        }

        if (input.employeeName === 'Roy Keane') {
            return {
                companyName: 'Manchester United'
            }
        }

        return {};
    }
});
