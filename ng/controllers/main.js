angular.module('MyApp')
	.controller('MainCtrl', ['$scope', 'Show', function ($scope, Show) {
		$scope.alphabet = [
			'0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		];

		$scope.genres = [
			'Action', 'Adventure', 'Animation', 'Children', 'Comedy', 'Crime',
			'Documentary', 'Drama', 'Family', 'Fantasy', 'Food', 'Home and Garden',
			'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality', 'Romance',
			'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller', 'Travel',
		];

		$scope.headingTitle = 'Top 12 Shows';

		NProgress.start();
		$scope.shows = Show.query();
		NProgress.done();

		$scope.filterByGenre = (genre) => {
			NProgress.start();
			$scope.shows = Show.query({ genre });
			$scope.headingTitle = genre;
			NProgress.done();
		};

		$scope.filterByAlphabet = (char) => {
			NProgress.start();
			$scope.shows = Show.query({ alphabet: char });
			$scope.headingTitle = char;
			NProgress.done();
		};
	}]);
