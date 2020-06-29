(function(){

    var dataChangedEvent = new Event('dataChanged')

    function Jobs() {
        this.url = 'positions'
        this.positions = []
    }

    /* get data from the API endpoint and store it locally */
    Jobs.prototype.getData = function() {

        var self = this

        $.get({
           url: self.url,
           success: function(data) {
                /* store data as a property of this object */
                self.positions = data

                /* trigger the data changed event */
                window.dispatchEvent(dataChangedEvent)
           }
        })
    }

    /* return the list of positions */
    Jobs.prototype.getPositions = function() {
        if (this.positions === []) {
            return []
        } else {
            positions = this.positions
            return positions
        }
    }

    /* return the details of a particular position */
    Jobs.prototype.getDetails = function(posid) {

        for(var i=0; i<positions.length; i++) {
            if (positions[i].id === posid) {
                return positions[i]
            }
        }
        return null
    }

    /* export to the global window object */
    window.app = window.app || {}
    window.app.Jobs = Jobs

})()
