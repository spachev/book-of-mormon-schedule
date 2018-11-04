var app = angular.module('bookOfMormonSchedule', ['ngMaterial', 'ngMessages']);
app.controller("appCtrl", function ($scope) {

	$scope.MS_PER_DAY = 3600 * 24 * 1000;
	$scope.startDate = new Date();
	$scope.endDate = new Date($scope.startDate.getFullYear(), 11, 31);
	$scope.startingFromVerse = "1 Nephi 1:1";

	$scope.fmtDate = function (d) {
		return d.toLocaleDateString("en-US");
	}

	$scope.getVerseInd = function (verse) {
		return verse_to_ind[verse];
	}

	$scope.parseVerse = function (s) {
		return s;
	}

	$scope.getStartVerseInd = function () {
		return $scope.getVerseInd($scope.parseVerse($scope.startingFromVerse));
	}

	$scope.generateSchedule = function () {
		var days = Math.ceil(($scope.endDate - $scope.startDate)/$scope.MS_PER_DAY) + 1;
		$scope.schedule = [];
		var i, verseInd = $scope.getStartVerseInd();
		var d = new Date($scope.startDate);
		var versesLeft = verses.length - verseInd;
		var dVerse = Math.ceil(versesLeft / days);
		var maxVerseInd = verses.length - 1;

		for (i = 0; i < days; i++)
		{
			var endVerseInd = verseInd + dVerse - 1;
			if (endVerseInd > maxVerseInd)
				endVerseInd = maxVerseInd;
			var o = {
				date: $scope.fmtDate(d),
				startVerse: verses[verseInd],
				endVerse: verses[endVerseInd]
			};
			d.setDate(d.getDate() + 1);
			verseInd += dVerse;
			$scope.schedule.push(o);
		}
	}
});
