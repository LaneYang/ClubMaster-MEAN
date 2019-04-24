var mongoose = require("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("Widget", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForClub = findAllWidgetsForClub;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(clubId, widget) {
  widget._club = clubId;
  return WidgetModel.create(widget);
}

function findAllWidgetsForClub(clubId) {
  return WidgetModel.find({_club: clubId})
    .sort({position: 1}).exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return WidgetModel.findByIdAndUpdate(widgetId, widget);
}

function deleteWidget(widgetId) {
  return WidgetModel.remove({_id: widgetId});
}

function reorderWidget(clubId, start, end) {
  return WidgetModel.find({_club: clubId}, function (err, widgets) {
    widgets.forEach(function (widget) {
      if (start < end) {
        if (widget.position === start) {
          widget.position = end;
          widget.save();
        } else if (widget.position > start
          && widget.position <= end) {
          widget.position--;
          widget.save();
        }
      } else {
        if (widget.position === start) {
          widget.position = end;
          widget.save();
        } else if (widget.position < start
          && widget.position >= end) {
          widget.position++;
          widget.save();
        }
      }
    });
  });

}

